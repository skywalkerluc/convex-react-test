import { Authority } from './authority';
import { Establishment } from './establishment';

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
