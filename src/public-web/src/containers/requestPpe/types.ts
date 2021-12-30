import { PpeType } from '../../models/ppeType';

export interface PpeRequestTypeSubForm {
  need: boolean;
  dailyShortage: number;
  dailyShortageForWhom: string;
  ppeTypeOther: string;
}

export const defaultPpeRequestTypeSubForm: PpeRequestTypeSubForm = {
  need: false,
  dailyShortage: 0,
  dailyShortageForWhom: '',
  ppeTypeOther: '',
};

export interface RegisterRequestForm {
  publishAnonymously: boolean;
  contactName: string;
  email: string;
  phoneNumber: string;
  organisationName: string;
  orgType: string;
  orgTypeOther: string;
  jobTitle: string;
  department: string;
  addressLineOne: string;
  addressLineTwo: string;
  postcode: string;
  tellUsMore: string;
  ppe: { [key in PpeType]: PpeRequestTypeSubForm };
}

export const defaultRegisterRequestForm: RegisterRequestForm = {
  publishAnonymously: false,
  contactName: '',
  email: '',
  phoneNumber: '',
  organisationName: '',
  orgType: '',
  orgTypeOther: '',
  jobTitle: '',
  department: '',
  addressLineOne: '',
  addressLineTwo: '',
  postcode: '',
  tellUsMore: '',
  ppe: {
    [PpeType.TypeIIRSurgicalMasks]: defaultPpeRequestTypeSubForm,
    [PpeType.FFP1RespiratorMasks]: defaultPpeRequestTypeSubForm,
    [PpeType.FFP2RespiratorMasks]: defaultPpeRequestTypeSubForm,
    [PpeType.FFP3RespiratorMasks]: defaultPpeRequestTypeSubForm,
    [PpeType.Gowns]: defaultPpeRequestTypeSubForm,
    [PpeType.Aprons]: defaultPpeRequestTypeSubForm,
    [PpeType.Gloves]: defaultPpeRequestTypeSubForm,
    [PpeType.Scrubs]: defaultPpeRequestTypeSubForm,
    [PpeType.SafetyGlasses]: defaultPpeRequestTypeSubForm,
    [PpeType.FaceVisors]: defaultPpeRequestTypeSubForm,
    [PpeType.AlcoholHandGel]: defaultPpeRequestTypeSubForm,
    [PpeType.Other]: defaultPpeRequestTypeSubForm,
  },
};
