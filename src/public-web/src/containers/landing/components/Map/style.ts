import { createStyles } from '@mantine/core';
import 'mapbox-gl/dist/mapbox-gl.css';

export const useStyles = createStyles((_theme) => ({
  mapControl: {
    position: 'absolute',
    zIndex: 10,
    top: '0.5rem',
    right: '0.5rem',
  },
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
}));
