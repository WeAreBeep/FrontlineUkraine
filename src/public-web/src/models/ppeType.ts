import { Nullable } from '../utils/nullable';

export enum PpeTypeEnum {
  TypeIIRSurgicalMasks = 'TypeIIRSurgicalMasks',
  FFP1RespiratorMasks = 'FFP1RespiratorMasks',
  FFP2RespiratorMasks = 'FFP2RespiratorMasks',
  FFP3RespiratorMasks = 'FFP3RespiratorMasks',
  Gowns = 'Gowns',
  Aprons = 'Aprons',
  Gloves = 'Gloves',
  Scrubs = 'Scrubs',
  SafetyGlasses = 'SafetyGlasses',
  FaceVisors = 'FaceVisors',
  AlcoholHandGel = 'AlcoholHandGel',
  Other = 'Other',
}

export const allPpeTypes = Object.keys(PpeTypeEnum);

// NOTE: Order matters, it represents the ordinal value
export const PPE_TYPES = [
  PpeTypeEnum.TypeIIRSurgicalMasks,
  PpeTypeEnum.FFP1RespiratorMasks,
  PpeTypeEnum.FFP2RespiratorMasks,
  PpeTypeEnum.FFP3RespiratorMasks,
  PpeTypeEnum.Gowns,
  PpeTypeEnum.Aprons,
  PpeTypeEnum.Gloves,
  PpeTypeEnum.Scrubs,
  PpeTypeEnum.SafetyGlasses,
  PpeTypeEnum.FaceVisors,
  PpeTypeEnum.AlcoholHandGel,
  PpeTypeEnum.Other,
];

export function getPpeTypeEnumFromInt(value: number): PpeTypeEnum | undefined {
  // Starting from 1
  return PPE_TYPES[value - 1];
}

export const PpeTypeName = {
  [PpeTypeEnum.TypeIIRSurgicalMasks]: 'Type IIR Surgical Masks',
  [PpeTypeEnum.FFP1RespiratorMasks]: 'FFP1 Respirator Masks',
  [PpeTypeEnum.FFP2RespiratorMasks]: 'FFP2 Respirator Masks',
  [PpeTypeEnum.FFP3RespiratorMasks]: 'FFP3 Respirator Masks',
  [PpeTypeEnum.Gowns]: 'Gowns',
  [PpeTypeEnum.Aprons]: 'Aprons',
  [PpeTypeEnum.Gloves]: 'Gloves',
  [PpeTypeEnum.Scrubs]: 'Scrubs',
  [PpeTypeEnum.SafetyGlasses]: 'Safety Glasses',
  [PpeTypeEnum.FaceVisors]: 'Face Visors',
  [PpeTypeEnum.AlcoholHandGel]: 'Alcohol Hand Gel',
  [PpeTypeEnum.Other]: 'Other',
};

export interface PpeType {
  ppeType: number;
  ppeTypeOther: Nullable<string>;
}

export interface NeedPpeType extends PpeType {
  status: number; // TODO: Conversion from int to enum
}
