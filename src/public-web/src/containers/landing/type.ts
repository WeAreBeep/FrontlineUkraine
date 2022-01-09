import { PPE_TYPES, PpeTypeEnum } from '../../models/ppeType';

export enum CategoryEnum {
  Need = 'needs',
  NeedMet = 'needs_met',
  Supply = 'supplies',
}

export interface CategoryVisibility {
  visibleType: 'post' | 'breakdown';
  breakdownVisibility: Record<PpeTypeEnum, boolean>;
}

const defaultBreakdownVisibility = PPE_TYPES.reduce<
  CategoryVisibility['breakdownVisibility']
>((acc, type) => {
  acc[type] = false;
  return acc;
  // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
}, {} as any);

const defaultCategoryVisibility: CategoryVisibility = {
  visibleType: 'post',
  breakdownVisibility: defaultBreakdownVisibility,
};

export type CategoryVisibilityMap = Record<CategoryEnum, CategoryVisibility>;

export const defaultCategoryVisibilityMap: CategoryVisibilityMap = {
  [CategoryEnum.Need]: defaultCategoryVisibility,
  [CategoryEnum.NeedMet]: defaultCategoryVisibility,
  [CategoryEnum.Supply]: defaultCategoryVisibility,
};

export interface ClusterColor {
  outer: string;
  inner: string;
}

export interface PointColor {
  outer?: string;
  inner: string;
}

export interface ClusterColorStep {
  small: ClusterColor;
  medium: ClusterColor;
  large: ClusterColor;
}
