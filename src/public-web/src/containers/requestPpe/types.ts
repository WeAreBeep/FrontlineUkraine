import { PpeTypeEnum } from '../../models/ppeType';

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
  ppeTypes: { [key in PpeTypeEnum]: PpeRequestTypeSubForm };
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
  ppeTypes: {
    [PpeTypeEnum.TypeIIRSurgicalMasks]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.FFP1RespiratorMasks]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.FFP2RespiratorMasks]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.FFP3RespiratorMasks]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.Gowns]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.Aprons]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.Gloves]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.Scrubs]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.SafetyGlasses]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.FaceVisors]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.AlcoholHandGel]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.Other]: defaultPpeRequestTypeSubForm,
  },
};
