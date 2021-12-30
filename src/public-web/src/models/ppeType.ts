export enum PpeType {
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

export const allPpeTypes = Object.keys(PpeType);

export const PPE_TYPES = [
  PpeType.TypeIIRSurgicalMasks,
  PpeType.FFP1RespiratorMasks,
  PpeType.FFP2RespiratorMasks,
  PpeType.FFP3RespiratorMasks,
  PpeType.Gowns,
  PpeType.Aprons,
  PpeType.Gloves,
  PpeType.Scrubs,
  PpeType.SafetyGlasses,
  PpeType.FaceVisors,
  PpeType.AlcoholHandGel,
  PpeType.Other,
];

export const PpeTypeName = {
  [PpeType.TypeIIRSurgicalMasks]: 'Type IIR Surgical Masks',
  [PpeType.FFP1RespiratorMasks]: 'FFP1 Respirator Masks',
  [PpeType.FFP2RespiratorMasks]: 'FFP2 Respirator Masks',
  [PpeType.FFP3RespiratorMasks]: 'FFP3 Respirator Masks',
  [PpeType.Gowns]: 'Gowns',
  [PpeType.Aprons]: 'Aprons',
  [PpeType.Gloves]: 'Gloves',
  [PpeType.Scrubs]: 'Scrubs',
  [PpeType.SafetyGlasses]: 'Safety Glasses',
  [PpeType.FaceVisors]: 'FaceVisors',
  [PpeType.AlcoholHandGel]: 'Alcohol Hand Gel',
  [PpeType.Other]: 'Other',
};
