import React from 'react';
import ReactMapGL from 'react-map-gl';

export function Map() {
  const [viewport, setViewport] = React.useState({
    latitude: 51.509865,
    longitude: -0.118092,
    zoom: 8,
  });

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken=""
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={(viewport: React.SetStateAction<{ latitude: number; longitude: number; zoom: number; }>) => setViewport(viewport)}
    />
  );
}
