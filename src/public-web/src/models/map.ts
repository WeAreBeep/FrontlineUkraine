import GeoJSON from 'geojson';
import { Need } from './need';
import { Supply } from './supply';
import { CategoryEnum } from '../containers/landing/type';
import { CityMapData } from './cityMapData';

/*
{
    "type": "Feature",
    "geometry": {
        "coordinates": [
            51.45246,
            -0.17485
        ],
        "type": "Point"
    },
    "properties": {
        "recordType": "need",
        "recordId": 1647
    },
    "id": "1647_1",
    "bbox": null
}
*/
export type RestrictedMapRecordTypes = 'need' | 'supply';

export interface FLFeatureProps<TRecordType> {
  recordType: TRecordType;
  recordId: number;
}
type FLFeatureCollection<TRecordType> = GeoJSON.FeatureCollection<
  GeoJSON.Point,
  FLFeatureProps<TRecordType>
>;

interface PointsBreakdown<TRecordType> {
  type: number; // TODO: Map the int value to string
  geojsonFeatureCollection: FLFeatureCollection<TRecordType>;
}

interface Category<TRecordType> {
  pointsCount: number;
  pointsBreakdowns: PointsBreakdown<TRecordType>[];
  posts: FLFeatureCollection<TRecordType>;
}

// TODO type constraint
export interface MapData<TRecordType, TRecordMap> {
  categories: Record<CategoryEnum, Category<TRecordType>>;
  records: TRecordMap;
}

export type MapDataResourceType<TMapData> = TMapData extends MapData<
  infer ResourceType,
  unknown
>
  ? ResourceType
  : never;

export type MapDataRecordMapType<TMapData> = TMapData extends MapData<
  unknown,
  infer RecordMapType
>
  ? RecordMapType
  : never;

export type RestrictedMapData = MapData<
  RestrictedMapRecordTypes,
  {
    need: Record<number, Need>;
    supply: Record<number, Supply>;
  }
>;

export type PublicMapData = MapData<
  'city' | 'supply',
  {
    city: Record<number, CityMapData>;
    supply: Record<number, Supply>;
  }
>;
