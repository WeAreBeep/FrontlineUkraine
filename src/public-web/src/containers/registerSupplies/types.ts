import { PpeTypeEnum } from '../../models/ppeType';

export interface PpeSupplyTypeSubForm {
  can: boolean;
  typeOther: string;
  meetRegulations: string;
  costType: string;
  costTypeOther: string;
  capacityPerWeek: number;
  currentStock: number;
  leadTimeInDays: number;
  notes: string;
}

export const defaultPpeSupplyTypeSubForm: PpeSupplyTypeSubForm = {
  can: false,
  typeOther: '',
  meetRegulations: '',
  costType: '',
  costTypeOther: '',
  capacityPerWeek: 0,
  currentStock: 0,
  leadTimeInDays: 0,
  notes: '',
};

export interface RegisterSuppliesForm {
  organisationName: string;
  description: string;
  supplierType: string;
  supplierTypeOther: string;
  email: string;
  website: string;
  phoneNumber: string;
  contactName: string;
  postcode: string;
  ppeTypes: { [key in PpeTypeEnum]: PpeSupplyTypeSubForm };
}

export const defaultRegisterSuppliesForm: RegisterSuppliesForm = {
  organisationName: '',
  description: '',
  supplierType: '',
  supplierTypeOther: '',
  email: '',
  website: '',
  phoneNumber: '',
  contactName: '',
  postcode: '',
  ppeTypes: {
    [PpeTypeEnum.TypeIIRSurgicalMasks]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.FFP1RespiratorMasks]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.FFP2RespiratorMasks]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.FFP3RespiratorMasks]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.Gowns]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.Aprons]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.Gloves]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.Scrubs]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.SafetyGlasses]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.FaceVisors]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.AlcoholHandGel]: defaultPpeSupplyTypeSubForm,
    [PpeTypeEnum.Other]: defaultPpeSupplyTypeSubForm,
  },
};
