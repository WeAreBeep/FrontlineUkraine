import { City } from './city';

type ResourceTypeCount = [resourceTypeId: number, count: number];

export interface CityMapData {
  city: City;
  metResourceTypeStat: ResourceTypeCount[];
  needsResourceTypeStat: ResourceTypeCount[];
}
