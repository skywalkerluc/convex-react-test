export interface Establishment {
  id: number;
  businessName: string;
  ratingValue: string;
}

export interface EstablishmentDetails {
  id: number;
  businessName: string;
  ratingValue: string;
  ratingDate: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressLine4: string;
  postCode: string;
  scores: {
    Hygiene: string;
    Structural: string;
    ConfidenceInManagement: string;
  };
}

export type UseEstablishmentsReturn = {
  establishments: Establishment[];
  totalPages: number;
  loading: boolean;
  error: Error | null;
};
