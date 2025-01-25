import { Establishment } from './establishment';

export type EstablishmentResponse = {
  establishments: Establishment[];
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
