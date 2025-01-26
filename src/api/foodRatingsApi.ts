import { AuthorityResponse, EstablishmentResponse } from '../types/api';
import { PaginationParams } from '../types/pagination';
import { sanitizeBusinessName } from '../utils/sanitize';

const API_BASE = 'http://api.ratings.food.gov.uk';

const handleApiResponse = async (response: Response) => {
  if (!response?.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapEstablishment = (est: any) => ({
  id: est.FHRSID?.toString() ?? '',
  businessName: est.BusinessName ? sanitizeBusinessName(est.BusinessName) : 'Unknown business name',
  ratingValue: Number(est.RatingValue) || 0,
  latitude: est.geocode?.latitude ?? '0',
  longitude: est.geocode?.longitude ?? '0',
  addressLine1: est.AddressLine1 ?? '',
  addressLine2: est.AddressLine2 ?? '',
  addressLine3: est.AddressLine3 ?? '',
  postCode: est.PostCode ?? '',
});

export const getAuthorities = async (signal?: AbortSignal): Promise<AuthorityResponse> => {
  try {
    const response = await fetch(`${API_BASE}/Authorities`, {
      headers: { 'x-api-version': '2' },
      signal,
    });

    const rawData = await handleApiResponse(response);

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      authorities: rawData.authorities.map((auth: any) => ({
        id: auth.LocalAuthorityId,
        name: auth.Name,
      })),
      meta: rawData.meta,
      links: rawData.links,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch authorities');
  }
};

export const getEstablishmentRatings = async (
  params: PaginationParams,
  signal?: AbortSignal,
): Promise<EstablishmentResponse> => {
  try {
    const pageNumber = params.page?.toString() || '1';
    const pageSize = params.pageSize?.toString() || '5';
    const url = new URL(`${API_BASE}/Establishments/basic/${pageNumber}/${pageSize}`);

    if (params.authority) {
      url.searchParams.set('localAuthorityId', params.authority);
    }

    const response = await fetch(url.toString(), {
      headers: { 'x-api-version': '2' },
      signal,
    });

    const rawData = await handleApiResponse(response);

    return {
      establishments: rawData.establishments.map(mapEstablishment),
      meta: rawData.meta,
      links: rawData.links,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch establishments');
  }
};
