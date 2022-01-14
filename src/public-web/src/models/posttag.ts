export interface AddressEntry {
  idx: string;
  label: string;
  postcode: string;
  addressLineOne: string;
  addressLineTwo: string;
}

export interface SearchAddressResponse {
  data: AddressEntry[];
}
