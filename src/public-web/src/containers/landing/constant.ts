import { CategoryEnum, ClusterColorStep } from './type';
import { PpeTypeEnum } from '../../models/ppeType';

export const CATEGORIES = ['needs', 'needs_met', 'supplies'];

export const CLUSTER_COLORS: Record<string, ClusterColorStep> = {
  needs: {
    small: {
      outer: 'rgb(241, 211, 87)',
      inner: 'rgb(240, 194, 12)',
    },
    medium: {
      outer: 'rgb(253, 156, 115)',
      inner: 'rgb(241, 128, 23)',
    },
    large: {
      outer: 'rgb(165, 26, 26)',
      inner: 'rgb(165, 26, 26)',
    },
  },
  needs_met: {
    small: {
      outer: 'rgb(0, 127, 255)',
      inner: 'rgb(0, 101, 204)',
    },

    medium: {
      outer: 'rgb(81, 129, 179)',
      inner: 'rgb(94, 94, 255)',
    },

    large: {
      outer: 'rgb(94, 94, 255)',
      inner: 'rgb(25, 25, 255)',
    },
  },
  supplies: {
    small: {
      outer: 'rgb(181, 226, 140)',
      inner: 'rgb(110, 204, 57)',
    },

    medium: {
      outer: 'rgb(73, 186, 74)',
      inner: 'rgb(55, 177, 82)',
    },

    large: {
      outer: 'rgb(0, 150, 107)',
      inner: 'rgb(13, 118, 88)',
    },
  },
};

export const POINT_COLORS: Record<string, string> = {
  needs: '#A51A1A',
  needs_met: '#0065cc',
  supplies: '#00966B',
};

export const CATEGORY_NAME: Record<CategoryEnum, string> = {
  [CategoryEnum.Need]: 'Needs',
  [CategoryEnum.NeedMet]: 'Needs Met',
  [CategoryEnum.Supply]: 'Supplies',
};

export const PPE_TYPE_COLOR: Record<PpeTypeEnum, string> = {
  // Blues
  [PpeTypeEnum.TypeIIRSurgicalMasks]: '#A0C7E1',
  [PpeTypeEnum.FFP1RespiratorMasks]: '#4C80B6',
  [PpeTypeEnum.FFP2RespiratorMasks]: '#0C4C96',
  [PpeTypeEnum.FFP3RespiratorMasks]: '#20254B',
  // Greens
  [PpeTypeEnum.Gowns]: '#64AE3F',
  [PpeTypeEnum.Aprons]: '#21652D',
  [PpeTypeEnum.Gloves]: '#71C2AC',
  [PpeTypeEnum.Scrubs]: '#00966B',
  // Purples
  [PpeTypeEnum.SafetyGlasses]: '#9388AA',
  [PpeTypeEnum.FaceVisors]: '#4B3F72',
  [PpeTypeEnum.AlcoholHandGel]: '#54243C',
  //Grey
  [PpeTypeEnum.Other]: '#706F6F',
};
