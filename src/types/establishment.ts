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

export interface EstablishmentsResponse {
  establishments: Establishment[];
  meta: {
    dataSource: string;
    extractDate: string;
    itemCount: number;
    returncode: string;
    totalCount: number;
    totalPages: number;
    pageSize: number;
    pageNumber: number;
  };
  links: Array<{
    rel: string;
    href: string;
  }>;
}

export type PaginationParams = {
  page: number;
  pageSize: number;
};

export type UseEstablishmentsReturn = {
  establishments: Establishment[];
  totalPages: number;
  loading: boolean;
  error: string | null;
};
