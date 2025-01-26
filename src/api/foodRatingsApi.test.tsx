import fetch, { enableFetchMocks } from 'jest-fetch-mock';

import { EstablishmentListResponse, AuthorityListResponse } from '../types/api';
import { PaginationParams } from '../types/pagination';

import { getEstablishmentRatings, getAuthorities, getEstablishmentDetails } from './foodRatingsApi';

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
      RatingDate: '2024-01-01T00:00:00',
      AddressLine1: 'Test Street 1',
      AddressLine2: '',
      AddressLine3: '',
      AddressLine4: '',
      PostCode: 'TE5 5TP',
      geocode: {
        latitude: '51.5074',
        longitude: '-0.1278',
      },
      scores: {
        Hygiene: 5,
        Structural: 5,
        ConfidenceInManagement: 5,
      },
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

    const expectedMappedData: EstablishmentListResponse = {
      establishments: [
        {
          id: 12345,
          businessName: 'Test Restaurant',
          ratingValue: '5',
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

    const expectedMappedAuthorities: AuthorityListResponse = {
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

  describe('getEstablishmentDetails', () => {
    const mockApiResponse = {
      FHRSID: 123,
      BusinessName: 'Test Restaurant',
      RatingValue: '5',
      RatingDate: '2024-01-01T00:00:00',
      AddressLine1: 'Test Street 1',
      AddressLine2: 'Test Line 2',
      AddressLine3: 'Test Line 3',
      AddressLine4: 'Test Line 4',
      PostCode: 'TE5 5TP',
      geocode: {
        latitude: '51.5074',
        longitude: '-0.1278',
      },
      scores: {
        Hygiene: 5,
        Structural: 5,
        ConfidenceInManagement: 5,
      },
    };

    const expectedMappedData = {
      id: 123,
      businessName: 'Test Restaurant',
      ratingValue: '5',
      ratingDate: '2024-01-01T00:00:00',
      addressLine1: 'Test Street 1',
      addressLine2: 'Test Line 2',
      addressLine3: 'Test Line 3',
      addressLine4: 'Test Line 4',
      postCode: 'TE5 5TP',
      scores: {
        Hygiene: 5,
        Structural: 5,
        ConfidenceInManagement: 5,
      },
    };

    it('should call API with correct URL and map response', async () => {
      fetch.mockResponseOnce(JSON.stringify(mockApiResponse));

      const result = await getEstablishmentDetails(123);

      expect(fetch).toHaveBeenCalledWith(
        'http://api.ratings.food.gov.uk/Establishments/123',
        expect.objectContaining({
          headers: { 'x-api-version': '2' },
        }),
      );
      expect(result).toEqual(expectedMappedData);
    });

    it('should throw error when API response is not OK', async () => {
      fetch.mockResponseOnce(JSON.stringify({}), { status: 404 });
      await expect(getEstablishmentDetails(123)).rejects.toThrow('HTTP error! Status: 404');
    });

    it('should abort request when unmounted', async () => {
      const controller = new AbortController();
      const promise = getEstablishmentDetails(123, controller.signal);
      controller.abort();
      await expect(promise).rejects.toThrow();
    });
  });
});
