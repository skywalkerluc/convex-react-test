import { AuthorityListResponse, EstablishmentListResponse } from '../types/api';
import { Establishment, EstablishmentDetails } from '../types/establishment';
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
const mapEstablishment = (est: any): Establishment => ({
  id: est.FHRSID,
  businessName: sanitizeBusinessName(est.BusinessName),
  ratingValue: est.RatingValue || 'N/A',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapEstablishmentDetails = (est: any): EstablishmentDetails => ({
  id: est.FHRSID,
  businessName: sanitizeBusinessName(est.BusinessName),
  ratingValue: est.RatingValue || 'N/A',
  ratingDate: est.RatingDate,
  addressLine1: est.AddressLine1,
  addressLine2: est.AddressLine2,
  addressLine3: est.AddressLine3,
  addressLine4: est.addressLine4,
  postCode: est.PostCode,
  scores: {
    Hygiene: est.scores?.Hygiene || 'Not available',
    Structural: est.scores?.Structural || 'Not available',
    ConfidenceInManagement: est.scores?.ConfidenceInManagement || 'Not available',
  },
});

export const getAuthorities = async (signal?: AbortSignal): Promise<AuthorityListResponse> => {
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
): Promise<EstablishmentListResponse> => {
  try {
    const url = new URL(`${API_BASE}/Establishments/basic/${params.page}/${params.pageSize}`);

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

export const getEstablishmentDetails = async (
  id: number,
  signal?: AbortSignal,
): Promise<EstablishmentDetails> => {
  try {
    const response = await fetch(`${API_BASE}/Establishments/${id}`, {
      headers: { 'x-api-version': '2' },
      signal,
    });

    const rawData = await handleApiResponse(response);

    return mapEstablishmentDetails(rawData);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Falha ao buscar detalhes');
  }
};
