import fetch, { enableFetchMocks } from 'jest-fetch-mock';

import { EstablishmentResponse, AuthorityResponse } from '../types/api';
import { PaginationParams } from '../types/pagination';

import { getEstablishmentRatings, getAuthorities } from './foodRatingsApi';

enableFetchMocks();

describe('foodRatingsApi', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  describe('getEstablishmentRatings', () => {
    const mockEstablishment = {
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
    };

    const mockApiResponse = {
      establishments: [mockEstablishment],
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

    it('should call API with correct parameters and map response', async () => {
      const pageParams: PaginationParams = { page: 1, pageSize: 10 };
      fetch.mockResponseOnce(JSON.stringify(mockApiResponse));

      const result = await getEstablishmentRatings(pageParams);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `http://api.ratings.food.gov.uk/Establishments/basic/${pageParams.page}/${pageParams.pageSize}`,
        {
          headers: { 'x-api-version': '2' },
        },
      );
      expect(result).toEqual(expectedMappedData);
    });

    it('should include authority in URL when provided', async () => {
      const pageParams: PaginationParams = { page: 1, pageSize: 10, authority: '123' };
      fetch.mockResponseOnce(JSON.stringify(mockApiResponse));

      await getEstablishmentRatings(pageParams);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('localAuthorityId=123'),
        expect.anything(),
      );
    });

    it('should throw error when API response is not OK', async () => {
      const pageParams: PaginationParams = { page: 1, pageSize: 10 };
      fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });

      await expect(getEstablishmentRatings(pageParams)).rejects.toThrow('HTTP error! Status: 500');
    });

    it('should handle unexpected data format', async () => {
      const pageParams: PaginationParams = { page: 1, pageSize: 10 };
      fetch.mockResponseOnce(
        JSON.stringify({
          establishments: [{}], // Invalid data
          meta: {},
          links: [],
        }),
      );

      const result = await getEstablishmentRatings(pageParams);

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

  describe('getAuthorities', () => {
    const mockAuthoritiesResponse = {
      authorities: [
        { LocalAuthorityId: 1, Name: 'Authority 1' },
        { LocalAuthorityId: 2, Name: 'Authority 2' },
      ],
      meta: {
        dataSource: 'API',
        extractDate: '2023-09-20',
        itemCount: 2,
        returncode: 'OK',
        totalCount: 100,
        totalPages: 10,
        pageSize: 10,
        pageNumber: 1,
      },
      links: [],
    };

    const expectedMappedAuthorities: AuthorityResponse = {
      authorities: [
        { id: 1, name: 'Authority 1' },
        { id: 2, name: 'Authority 2' },
      ],
      meta: mockAuthoritiesResponse.meta,
      links: mockAuthoritiesResponse.links,
    };

    it('should fetch and map authorities correctly', async () => {
      fetch.mockResponseOnce(JSON.stringify(mockAuthoritiesResponse));

      const result = await getAuthorities();

      expect(fetch).toHaveBeenCalledWith('http://api.ratings.food.gov.uk/Authorities', {
        headers: { 'x-api-version': '2' },
      });
      expect(result).toEqual(expectedMappedAuthorities);
    });

    it('should throw error when API response is not OK', async () => {
      fetch.mockResponseOnce(JSON.stringify({}), { status: 401 });

      await expect(getAuthorities()).rejects.toThrow('HTTP error! Status: 401');
    });

    it('should abort request when unmounted', async () => {
      const controller = new AbortController();
      const promise = getAuthorities(controller.signal);

      controller.abort();
      await expect(promise).rejects.toThrow();
    });
  });
});
