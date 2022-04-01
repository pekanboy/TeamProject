import {defaultRoute, IRoute} from 'interfaces/IRoute';

export const useGetRoute = (id: number) => {
  const route: IRoute = defaultRoute;
  const loading = false;
  const error = null;

  return {
    route,
    loading,
    error,
  };
};
