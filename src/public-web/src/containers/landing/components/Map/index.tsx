import React from 'react';
import ReactMapGL from 'react-map-gl';
import { config } from '../../../../config';

export const Map: React.FC = () => {
  const [viewport, setViewport] = React.useState({
    latitude: 51.509865,
    longitude: -0.118092,
    zoom: 8,
  });

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={config.mapboxToken}
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={setViewport}
    />
  );
}
