/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

import { getAuthorities, getEstablishmentRatings } from '../api/foodRatingsApi';
import { Authority } from '../types/authority';
import { Establishment } from '../types/establishment';
import { PaginationParams } from '../types/pagination';

type AppState = {
  authorities: Authority[];
  establishments: Establishment[];
  pagination: PaginationParams;
  totalPages: number;
  isLoading: {
    authorities: boolean;
    establishments: boolean;
  };
  error: string | null;
};

type AppAction =
  | { type: 'FETCH_AUTHORITIES_START' }
  | { type: 'FETCH_AUTHORITIES_SUCCESS'; payload: Authority[] }
  | { type: 'FETCH_AUTHORITIES_ERROR'; payload: string }
  | { type: 'FETCH_ESTABLISHMENTS_START' }
  | {
      type: 'FETCH_ESTABLISHMENTS_SUCCESS';
      payload: { establishments: Establishment[]; totalPages: number };
    }
  | { type: 'FETCH_ESTABLISHMENTS_ERROR'; payload: string }
  | { type: 'SET_PAGINATION'; payload: Partial<PaginationParams> };

const initialState: AppState = {
  authorities: [],
  establishments: [],
  pagination: { page: 1, pageSize: 5 },
  totalPages: 0,
  isLoading: {
    authorities: false,
    establishments: false,
  },
  error: null,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  fetchAuthorities: () => Promise<void>;
  fetchEstablishments: () => Promise<void>;
}>({
  state: initialState,
  dispatch: () => null,
  fetchAuthorities: async () => {},
  fetchEstablishments: async () => {},
});

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'FETCH_AUTHORITIES_START':
      return { ...state, isLoading: { ...state.isLoading, authorities: true }, error: null };
    case 'FETCH_AUTHORITIES_SUCCESS':
      return {
        ...state,
        isLoading: { ...state.isLoading, authorities: false },
        authorities: action.payload,
      };
    case 'FETCH_AUTHORITIES_ERROR':
      return {
        ...state,
        isLoading: { ...state.isLoading, authorities: false },
        error: action.payload,
      };
    case 'FETCH_ESTABLISHMENTS_START':
      return { ...state, isLoading: { ...state.isLoading, establishments: true }, error: null };
    case 'FETCH_ESTABLISHMENTS_SUCCESS':
      return {
        ...state,
        isLoading: { ...state.isLoading, establishments: false },
        establishments: action.payload.establishments,
        totalPages: action.payload.totalPages,
      };
    case 'FETCH_ESTABLISHMENTS_ERROR':
      return {
        ...state,
        isLoading: { ...state.isLoading, establishments: false },
        error: action.payload,
      };
    case 'SET_PAGINATION':
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload },
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const fetchAuthorities = useCallback(async () => {
    if (state.authorities.length > 0) return;

    try {
      dispatch({ type: 'FETCH_AUTHORITIES_START' });
      const data = await getAuthorities();
      dispatch({ type: 'FETCH_AUTHORITIES_SUCCESS', payload: data.authorities });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch authorities';
      dispatch({ type: 'FETCH_AUTHORITIES_ERROR', payload: message });
    }
  }, [state.authorities.length]);

  const fetchEstablishments = useCallback(async () => {
    try {
      dispatch({ type: 'FETCH_ESTABLISHMENTS_START' });
      const data = await getEstablishmentRatings(state.pagination);
      dispatch({
        type: 'FETCH_ESTABLISHMENTS_SUCCESS',
        payload: {
          establishments: data.establishments,
          totalPages: data.meta.totalPages,
        },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch establishments';
      dispatch({ type: 'FETCH_ESTABLISHMENTS_ERROR', payload: message });
    }
  }, [state.pagination]);

  useEffect(() => {
    fetchAuthorities();
  }, [fetchAuthorities]);

  useEffect(() => {
    fetchEstablishments();
  }, [fetchEstablishments]);

  return (
    <AppContext.Provider value={{ state, dispatch, fetchAuthorities, fetchEstablishments }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
