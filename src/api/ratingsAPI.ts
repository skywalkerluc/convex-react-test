import { EstablishmentsResponse, PaginationParams } from '../types/establishment';
import { sanitizeBusinessName } from '../utils/sanitize';

const API_BASE_URL = 'http://api.ratings.food.gov.uk/Establishments';

export async function getEstablishmentRatings(
  params: PaginationParams,
  signal?: AbortSignal,
): Promise<EstablishmentsResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/basic/${params.page}/${params.pageSize}`, {
      headers: {
        'x-api-version': '2',
      },
      signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const rawData = await response.json();

    const mappedData: EstablishmentsResponse = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      establishments: rawData.establishments.map((est: any) => ({
        id: est.FHRSID?.toString() ?? '',
        businessName: est.BusinessName
          ? sanitizeBusinessName(est.BusinessName)
          : 'Unknown business name',
        ratingValue: Number(est.RatingValue) || 0,
        latitude: est.geocode?.latitude ?? '0',
        longitude: est.geocode?.longitude ?? '0',
        addressLine1: est.AddressLine1 ?? '',
        addressLine2: est.AddressLine2 ?? '',
        addressLine3: est.AddressLine3 ?? '',
        postCode: est.PostCode ?? '',
      })),
      meta: { ...rawData.meta },
      links: [...rawData.links],
    };

    return mappedData;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error instanceof Error ? error.message : 'Server error');
  }
}
