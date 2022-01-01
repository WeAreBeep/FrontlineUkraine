import { PpeType } from '../../models/ppeType';

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
  ppeTypes: { [key in PpeType]: PpeSupplyTypeSubForm };
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
    [PpeType.TypeIIRSurgicalMasks]: defaultPpeSupplyTypeSubForm,
    [PpeType.FFP1RespiratorMasks]: defaultPpeSupplyTypeSubForm,
    [PpeType.FFP2RespiratorMasks]: defaultPpeSupplyTypeSubForm,
    [PpeType.FFP3RespiratorMasks]: defaultPpeSupplyTypeSubForm,
    [PpeType.Gowns]: defaultPpeSupplyTypeSubForm,
    [PpeType.Aprons]: defaultPpeSupplyTypeSubForm,
    [PpeType.Gloves]: defaultPpeSupplyTypeSubForm,
    [PpeType.Scrubs]: defaultPpeSupplyTypeSubForm,
    [PpeType.SafetyGlasses]: defaultPpeSupplyTypeSubForm,
    [PpeType.FaceVisors]: defaultPpeSupplyTypeSubForm,
    [PpeType.AlcoholHandGel]: defaultPpeSupplyTypeSubForm,
    [PpeType.Other]: defaultPpeSupplyTypeSubForm,
  },
};
