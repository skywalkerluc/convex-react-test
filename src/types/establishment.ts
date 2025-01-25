export interface Establishment {
  id: string;
  businessName: string;
  ratingValue: number;
  latitude: string;
  longitude: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  postCode: string;
}

export type UseEstablishmentsReturn = {
  establishments: Establishment[];
  totalPages: number;
  loading: boolean;
  error: string | null;
};
