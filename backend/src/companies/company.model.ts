/* eslint-disable prettier/prettier */
export interface Company {
  id: string;
  name: string;
  registryNumber: string;
  active: CompanyActive;
}

export enum CompanyActive {
  ACTIVE = 'ACTIVE',
  DEACTIVE = 'DEACTIVE',
}
