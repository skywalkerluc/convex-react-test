import fetch, { enableFetchMocks } from 'jest-fetch-mock';

import { EstablishmentResponse } from '../types/api';
import { PaginationParams } from '../types/pagination';

import { getEstablishmentRatings } from './ratingsAPI';

enableFetchMocks();

describe('Ratings API', () => {
  const mockApiResponse = {
    establishments: [
      {
        FHRSID: 12345,
        BusinessName: 'Test Restaurant',
        RatingValue: '5',
        geocode: {
          latitude: '51.5074',
          longitude: '-0.1278',
        },
        AddressLine1: 'Test Street 1',
        AddressLine2: '',
        AddressLine3: '',
        PostCode: 'TE5 5TP',
      },
    ],
    meta: {
      dataSource: 'API',
      extractDate: '2023-09-20',
      itemCount: 1,
      returncode: 'OK',
      totalCount: 100,
      totalPages: 10,
      pageSize: 10,
      pageNumber: 1,
    },
    links: [
      {
        rel: 'self',
        href: '/Establishments',
      },
    ],
  };

  const expectedMappedData: EstablishmentResponse = {
    establishments: [
      {
        id: '12345',
        businessName: 'Test Restaurant',
        ratingValue: 5,
        latitude: '51.5074',
        longitude: '-0.1278',
        addressLine1: 'Test Street 1',
        addressLine2: '',
        addressLine3: '',
        postCode: 'TE5 5TP',
      },
    ],
    meta: {
      ...mockApiResponse.meta,
      totalPages: 10,
    },
    links: mockApiResponse.links,
  };

  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should call API with correct parameters and map response', async () => {
    // Arrange
    const pageParams: PaginationParams = {
      page: 1,
      pageSize: 10,
    };

    fetch.mockResponseOnce(JSON.stringify(mockApiResponse));

    // Act
    const result = await getEstablishmentRatings(pageParams);

    // Assert
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `http://api.ratings.food.gov.uk/Establishments/basic/${pageParams.page}/${pageParams.pageSize}`,
      {
        headers: {
          'x-api-version': '2',
        },
      },
    );

    expect(result).toEqual(expectedMappedData);
  });

  it('should throw error when API response is not OK', async () => {
    // Arrange
    const pageParams: PaginationParams = {
      page: 1,
      pageSize: 10,
    };

    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });

    // Act & Assert
    await expect(getEstablishmentRatings(pageParams)).rejects.toThrow('HTTP error! Status: 500');
  });

  it('should handle unexpected data format', async () => {
    // Arrange
    const pageParams: PaginationParams = {
      page: 1,
      pageSize: 10,
    };

    fetch.mockResponseOnce(
      JSON.stringify({
        establishments: [{}], // Invalid data
        meta: {},
        links: [],
      }),
    );

    // Act
    const result = await getEstablishmentRatings(pageParams);

    // Assert
    expect(result.establishments[0]).toEqual({
      id: '',
      businessName: 'Unknown business name',
      ratingValue: 0,
      latitude: '0',
      longitude: '0',
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      postCode: '',
    });
  });

  it('should abort request when unmounted', async () => {
    const pageParams = { page: 1, pageSize: 10 };
    const controller = new AbortController();
    const promise = getEstablishmentRatings(pageParams, controller.signal);

    controller.abort();
    await expect(promise).rejects.toThrow();
  });
});
