import { PpeTypeEnum } from '../../models/ppeType';
import { MessageID } from '../../locale/type';

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
  orgRegCode: string;
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
  orgRegCode: '',
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

export const ORG_TYPES: {value: string, name: MessageID}[] = [
  { value: 'LocalCharity', name: 'organisation_type_local_charity' },
  { value: 'internationalOrgChapter', name: 'organisation_type_international_org_chapter' },
  { value: 'religious_institution', name: 'organisation_type_religious_institution' },
  { value: 'LocalOrRegionalAdmin', name: 'organisation_type_local_or_regional_admin' },
  { value: 'University', name: 'organisation_type_university' },
  { value: 'School', name: 'organisation_type_school' },
  { value: 'Community', name: 'organisation_type_community' },
  { value: 'LocalHospital', name: 'organisation_type_local_hospital' },
  { value: 'DistributionHub', name: 'organisation_type_distribution' },
  { value: 'Other', name: 'organisation_type_other' },
]