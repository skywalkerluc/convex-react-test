export type Authority = {
  id: number;
  name: string;
};

export type UseAuthoritiesReturn = {
  authorities: Authority[];
  loading: boolean;
  error: string | null;
};
