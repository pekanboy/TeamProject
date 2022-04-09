import React, {useContext, useState} from 'react';
import {defaultRoute, IRoute} from 'interfaces/IRoute';
import {IMarker} from 'components/Map/Marker/Marker.interface';
import {LatLng} from 'leaflet';
import {Nullable, Setter} from 'types/basic';
import {noop} from '@vkontakte/vkui/dist/lib/utils';

export interface RouteProviderContextType {
  route: Nullable<IRoute>;
  setRoute: Setter<Nullable<IRoute>>;
  currentLabels: IMarker[];
  setCurrentLabels: Setter<IMarker[]>;
  currentLinePoints: LatLng[];
  setCurrentLinePoints: Setter<LatLng[]>;
}

export const RouteProviderContext =
  React.createContext<RouteProviderContextType>({
    route: defaultRoute,
    setRoute: noop,
    currentLabels: [],
    setCurrentLabels: noop,
    currentLinePoints: [],
    setCurrentLinePoints: noop,
  });

export const RouteProvider: React.FC = ({children}) => {
  // Cостояния которые изменяются только при создании маршрута
  const [currentLabels, setCurrentLabels] = useState<IMarker[]>([]);
  const [currentLinePoints, setCurrentLinePoints] = useState<LatLng[]>([]);

  // Тут лежит текущий открытый маршрут
  const [route, setRoute] = useState<Nullable<IRoute>>(defaultRoute);

  const contextValue = {
    currentLabels: currentLabels,
    setCurrentLabels: setCurrentLabels,
    currentLinePoints: currentLinePoints,
    setCurrentLinePoints: setCurrentLinePoints,
    route: route,
    setRoute: setRoute,
  };

  return (
    <RouteProviderContext.Provider value={contextValue}>
      {children}
    </RouteProviderContext.Provider>
  );
};

export const useRouteProvider = () => {
  return useContext(RouteProviderContext);
};
