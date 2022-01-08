import GeoJSON from 'geojson';
import { Need } from './need';
import { Supply } from './supply';
import { CategoryEnum } from '../containers/landing/type';

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
export interface FLFeatureProps {
  recordType: 'need' | 'supply';
  recordId: number;
}
type FLFeatureCollection = GeoJSON.FeatureCollection<
  GeoJSON.Point,
  FLFeatureProps
>;

interface PointsBreakdown {
  type: number; // TODO: Map the int value to string
  geojsonFeatureCollection: FLFeatureCollection;
}

interface Category {
  pointsCount: number;
  pointsBreakdowns: PointsBreakdown[];
  posts: FLFeatureCollection;
}

export interface MapData {
  categories: Record<CategoryEnum, Category>;
  records: {
    need: Record<number, Need>;
    supply: Record<number, Supply>;
  };
}
