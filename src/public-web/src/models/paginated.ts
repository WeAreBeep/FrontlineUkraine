import { Nullable } from '../utils/nullable';

export interface Paginated<T> {
  data: T[];
  next: Nullable<string>;
  total: number;
}