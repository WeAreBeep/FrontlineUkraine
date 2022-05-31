import React, { useEffect, useRef, useState } from 'react';
import mapboxGl, {
  CirclePaint,
  Expression,
  GeoJSONSource,
  Map as MapboxMap,
  NavigationControl,
  Popup,
} from 'mapbox-gl';
import { config } from '../../../../config';
import { useStyles } from './style';
import { useAPIContext } from '../../../../contexts/APIContext';
import {
  FLFeatureProps,
  MapData,
  MapDataRecordMapType,
  MapDataResourceType,
} from '../../../../models/map';
import { Nullable } from '../../../../utils/nullable';
import { getPpeTypeEnumFromInt, PpeTypeEnum } from '../../../../models/ppeType';
import {
  CategoryEnum,
  ClusterColor,
  defaultCategoryVisibilityMap,
  PointColor,
} from '../../type';
import { MapControl } from '../MapControl';
import {
  CATEGORIES,
  CLUSTER_COLORS,
  DEFAULT_MAP_BOUNDS,
  POINT_COLORS,
  PPE_TYPE_COLOR,
} from '../../constant';
import { resolveDefaultLocale } from '../../../../locale/resolveDefaultLocale';
import { LocaleProvider } from '../../../../locale/LocaleProvider';
import { ServiceProvider } from '../../../../contexts/ServiceContext';
import { TranslatorProvider } from '../../../../contexts/translator/TranslatorContext';
import ReactDOM from 'react-dom';

mapboxGl.accessToken = config.mapboxToken;

export type MapRenderPopupType<TMapData extends MapData<unknown, unknown>> = (
  category: CategoryEnum,
  featureProps: FLFeatureProps<MapDataResourceType<TMapData>>,
  recordMap: MapDataRecordMapType<TMapData>
) => React.ReactNode;

function getClusterId(base: string) {
  return {
    clusterId: base,
    clusterCountId: `${base}_count`,
    unclusteredId: `${base}_unclustered`,
  };
}

function getPointBreakdownClusterIdBase(
  category: string,
  ppeType: PpeTypeEnum
) {
  return `${category}_${ppeType}`;
}

// Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
function getPointCountSteppedColor(colors: {
  small: string;
  medium: string;
  large: string;
}): Expression {
  return [
    'step',
    ['get', 'point_count'],
    colors.small,
    100,
    colors.medium,
    750,
    colors.large,
  ];
}

function addCluster<TMapData extends MapData<any, any>>(
  map: MapboxMap,
  {
    sourceId,
    clusterIdBase,
    initialVisible,
    clusterColors,
    pointColor,
    popupRenderer,
  }: {
    sourceId: string;
    clusterIdBase: string;
    initialVisible: boolean;
    clusterColors: {
      small: ClusterColor;
      medium: ClusterColor;
      large: ClusterColor;
    };
    pointColor: PointColor;
    popupRenderer: (
      props: FLFeatureProps<MapDataResourceType<TMapData>>
    ) => React.ReactNode;
  }
) {
  const { clusterId, clusterCountId, unclusteredId } =
    getClusterId(clusterIdBase);
  const visibility = initialVisible ? 'visible' : 'none';
  map.addLayer({
    id: clusterId,
    type: 'circle',
    source: sourceId,
    filter: ['has', 'point_count'],
    layout: {
      visibility,
    },
    paint: {
      'circle-color': getPointCountSteppedColor({
        small: clusterColors.small.inner,
        medium: clusterColors.medium.inner,
        large: clusterColors.large.inner,
      }),
      'circle-opacity': 0.6,
      'circle-radius': 15,
      'circle-stroke-color': getPointCountSteppedColor({
        small: clusterColors.small.outer,
        medium: clusterColors.medium.outer,
        large: clusterColors.large.outer,
      }),
      'circle-stroke-width': 2,
      'circle-stroke-opacity': 0.6,
    },
  });

  map.addLayer({
    id: clusterCountId,
    type: 'symbol',
    source: sourceId,
    filter: ['has', 'point_count'],
    layout: {
      visibility,
      'text-field': '{point_count_abbreviated}',
      'text-size': 12,
    },
  });

  const pointPaint: CirclePaint = {
    'circle-color': pointColor.inner,
    'circle-radius': 6,
  };
  if (pointColor.outer) {
    pointPaint['circle-stroke-color'] = pointColor.outer;
    pointPaint['circle-stroke-width'] = 3;
  }

  map.addLayer({
    id: unclusteredId,
    type: 'circle',
    source: sourceId,
    filter: ['!', ['has', 'point_count']],
    layout: {
      visibility,
    },
    paint: pointPaint,
  });

  // inspect a cluster on click
  map.on('click', clusterId, (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: [clusterId],
    });
    const mapClusterId = features[0]?.properties?.cluster_id;
    (map.getSource(sourceId) as GeoJSONSource).getClusterExpansionZoom(
      mapClusterId,
      (err, zoom) => {
        if (err) return;
        const point = features[0].geometry;
        if (point.type !== 'Point' || point.coordinates.length !== 2) return;
        map.easeTo({
          center: point.coordinates as [number, number],
          zoom: zoom,
        });
      }
    );
  });

  map.on('mouseenter', clusterId, () => {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', clusterId, () => {
    map.getCanvas().style.cursor = '';
  });

  map.on('mouseenter', unclusteredId, () => {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', unclusteredId, () => {
    map.getCanvas().style.cursor = '';
  });

  // When a click event occurs on a feature in
  // the unclustered-point layer, open a popup at
  // the location of the feature, with
  // description HTML from its properties.
  map.on('click', unclusteredId, (e) => {
    const feature = e.features?.[0];
    if (feature == null) return;
    const point = feature.geometry;
    if (point.type !== 'Point') return;
    const coordinates = point.coordinates.slice();
    const properties = feature.properties as FLFeatureProps<MapDataResourceType<TMapData>>;

    // Ensure that if the map is zoomed out such that
    // multiple copies of the feature are visible, the
    // popup appears over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    const popupNode = document.createElement('div');
    ReactDOM.render(
      <ServiceProvider windowImpl={window}>
        <LocaleProvider defaultLocale={resolveDefaultLocale(window)}>
          <TranslatorProvider>{popupRenderer(properties)}</TranslatorProvider>
        </LocaleProvider>
      </ServiceProvider>,
      popupNode
    );
    new Popup()
      .setLngLat(coordinates as [number, number])
      .setOffset({
        // Set offset to avoid overlapping with the marker
        top: [0, 10],
        bottom: [0, -10],
        left: [10, 0],
        right: [-10, 0],
        'top-left': [5, 5],
        'top-right': [-5, 5],
        'bottom-left': [5, -5],
        'bottom-right': [-5, -5],
      })
      .setMaxWidth('70%')
      .setDOMContent(popupNode)
      .addTo(map);

    // const popupBoundingClientRect = popupNode.getBoundingClientRect();
    // const popupCenter = map.unproject(new mapboxGl.Point(popupBoundingClientRect.left, popupBoundingClientRect.top + popupBoundingClientRect.height / 2));
    // map.easeTo({
    //   center: popupCenter,
    //   padding: 20,
    // })


    map.on('click', 'circle', (e) => {
      map.flyTo({
      center: e.staticBreadcrumbs.features[0].geometry.coordinates
      });
      });
  });
}



function setClusterVisibility(
  map: MapboxMap,
  clusterIdBase: string,
  visible: boolean
) {
  Object.values(getClusterId(clusterIdBase)).forEach((layerId) => {
    const layer = map.getLayer(layerId);
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (layer == null) return;
    map.setLayoutProperty(layerId, 'visibility', visible ? 'visible' : 'none');
  });
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function Map<TMapData extends MapData<any, any>>({
                                                          fetchMapData,
                                                          renderPopup,
                                                          focus,
                                                        }: {
  fetchMapData: () => Promise<TMapData>;
  renderPopup: MapRenderPopupType<TMapData>;
  focus: Nullable<{ lat: number; lng: number; zoom?: number }>;
}) {
  const { classes } = useStyles();
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef: React.MutableRefObject<MapboxMap | null> = useRef(null);

  const {
    actions: { getMapData },
  } = useAPIContext();
  const [mapData, setMapData] = useState<Nullable<TMapData>>(null);
  const [loaded, setLoaded] = useState(false);

  const [categoryVisibilityMap, setCategoryVisibilityMap] = useState(
    defaultCategoryVisibilityMap
  );

  useEffect(() => {
    if (mapRef.current) return; // initialize map only once
    if (mapContainer.current == null) return; // Only initialize the map when dom is ready
    mapRef.current = new MapboxMap({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      // The bound of the UK
      bounds: DEFAULT_MAP_BOUNDS,
      fitBoundsOptions: {
        padding: 20,
      },
      minZoom: 1,
      maxZoom: 18,
      pitchWithRotate: false,
    });
    mapRef.current.on('load', () => {
      setLoaded(true);
    });
    mapRef.current.addControl(
      new NavigationControl({
        showCompass: true,
        showZoom: true,
      }),
      'top-left'
    );
  });

  useEffect(() => {
    const fetch = async () => {
      const result = await fetchMapData();
      setMapData(result);
    };
    fetch().catch(console.error);
  }, [fetchMapData, getMapData]);

  useEffect(() => {
    // integrate data to the map
    const map = mapRef.current;
    if (map == null) return;
    if (mapData == null) return;
    if (!loaded) return;
    CATEGORIES.forEach((category) => {
      map.addSource(category, {
        type: 'geojson',
        data: mapData.categories[category].posts,
        cluster: true,
      });
      addCluster(map, {
        sourceId: category,
        clusterIdBase: category,
        initialVisible: true,
        clusterColors: CLUSTER_COLORS[category],
        pointColor: { inner: POINT_COLORS[category] },
        // eslint-disable-next-line react/no-unstable-nested-components
        popupRenderer: (featureProps) => {
          return renderPopup(category, featureProps, mapData.records);
        },
      });

      mapData.categories[category].pointsBreakdowns.forEach(
        ({ type, geojsonFeatureCollection }) => {
          const ppeType = getPpeTypeEnumFromInt(type) ?? PpeTypeEnum.Other;
          const breakdownSourceId = getPointBreakdownClusterIdBase(
            category,
            ppeType
          );
          map.addSource(breakdownSourceId, {
            type: 'geojson',
            data: geojsonFeatureCollection,
            cluster: true,
          });
          addCluster(map, {
            sourceId: breakdownSourceId,
            initialVisible: false,
            clusterIdBase: breakdownSourceId,
            clusterColors: CLUSTER_COLORS[category],
            pointColor: {
              outer: POINT_COLORS[category],
              inner: PPE_TYPE_COLOR[ppeType],
            },
            // eslint-disable-next-line react/no-unstable-nested-components
            popupRenderer: (featureProps) => {
              return renderPopup(category, featureProps, mapData.records);
            },
          });
        }
      );
    });
  }, [mapData, loaded, renderPopup]);

  useEffect(() => {
    const map = mapRef.current;
    if (map == null) return;
    if (focus) {
      map.setCenter(focus);

      if (focus.zoom) {
        map.setZoom(focus.zoom);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus?.lat, focus?.lng, focus?.zoom]);

  useEffect(() => {
    const map = mapRef.current;
    if (map == null) return;
    if (!loaded) return;
    Object.keys(categoryVisibilityMap).forEach((k) => {
      const category = k as CategoryEnum;
      const categoryVisibility = categoryVisibilityMap[category];
      setClusterVisibility(
        map,
        category,
        categoryVisibility.visibleType === 'post'
      );

      Object.keys(categoryVisibility.breakdownVisibility).forEach((k) => {
        const ppeType = k as PpeTypeEnum;
        const selected = categoryVisibility.breakdownVisibility[ppeType];
        setClusterVisibility(
          map,
          getPointBreakdownClusterIdBase(category, ppeType),
          selected && categoryVisibility.visibleType === 'breakdown'
        );
      });
    });
  }, [categoryVisibilityMap, loaded]);

  return (
    <div className={classes.container}>
      <div className={classes.mapControl}>
        <MapControl
          visibility={categoryVisibilityMap}
          onVisibilityChange={setCategoryVisibilityMap}
          mapData={mapData}
        />
      </div>
      <div ref={mapContainer} className={classes.map}/>
    </div>
  );
}
