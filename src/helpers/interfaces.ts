interface Parent {
  ssn: string;
  phoneNumber: string;
  emailAddress: string;
}

interface Infant {
  birthDate: string;
}

export interface RegisterData {
  parent: Parent;
  infant: Infant;
}

export interface Product {
  productId: number;
  nameSv: string;
}

interface InsuranceElement {
  products: Product[];
}

export interface InsuranceElementCategory {
  insuranceElements: InsuranceElement[];
}

export interface ExtraData {
  week?: string;
  day?: string;
  entryPoint?: string;
  phoneOS?: string;
  appVersion?: string;
  countryCode?: string;
  installationId?: string;
  timestamp?: string;
  offerType?: string;
  offerMachineName?: string;
}
