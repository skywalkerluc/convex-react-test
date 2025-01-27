import { Authority } from './authority';
import { Establishment } from './establishment';

export interface ApiEstablishmentResponse {
  FHRSID: number;
  BusinessName: string;
  RatingValue: string;
}

export interface ApiAuthorityResponse {
  LocalAuthorityId: number;
  Name: string;
}

export interface ApiEstablishmentDetailsResponse {
  FHRSID: number;
  BusinessName: string;
  RatingValue: string;
  RatingDate: string;
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
  AddressLine4: string;
  PostCode: string;
  scores?: ApiDetailsScoreResponse;
}

export interface ApiDetailsScoreResponse {
  Hygiene: string;
  Structural: string;
  ConfidenceInManagement: string;
}

export type EstablishmentListResponse = {
  establishments: Establishment[];
  meta: MetaResponse;
  links: LinksResponse[];
};

export type AuthorityListResponse = {
  authorities: Authority[];
  meta: MetaResponse;
  links: LinksResponse[];
};

type MetaResponse = {
  dataSource: string;
  extractDate: string;
  itemCount: number;
  returncode: string;
  totalCount: number;
  totalPages: number;
  pageSize: number;
  pageNumber: number;
};

type LinksResponse = {
  rel: string;
  href: string;
};
