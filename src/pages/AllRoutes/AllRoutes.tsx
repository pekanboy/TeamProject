import React, {useEffect} from 'react';
import style from 'pages/AllRoutes/AllRoutes.module.css';
import {Header} from 'components/Header/Header/Header';
import {Filters} from 'components/Filters/Filters';
import {RouteCard} from 'components/Cards/RouteCard/RouteCard';
import example from 'image/example.svg';
import {useAllRoutes} from 'hooks/axios/useAllRoutes';
import {IFilter} from 'interfaces/IFilter';

export const AllRoutes: React.FC = () => {
  const {route: routes, error, refresh} = useAllRoutes();

  useEffect(() => {
    const refreshInterval = setInterval(refresh, 5000);

    return () => {
      clearInterval(refreshInterval);
    };
  });

  if (error) {
    console.error(
      `Get all routes request filed. Code: ${error.name}. Message: ${error.code}`,
    );
  }

  const onFilterSelect = (filters: IFilter) => {
    refresh(filters);
  };

  return (
    <div className={style.container}>
      <Header title={'Все маршруты'} className={style.header} />
      <Filters onFilterSelect={onFilterSelect} />
      <div className={style.content}>
        {routes?.map((route) => (
          <RouteCard
            key={route.id}
            description={route?.description || ''}
            image={example}
            title={route?.title || ''}
            difficult={route?.difficult || 0}
            days={route?.days || -1}
            region={route?.region || ''}
            id={route?.id}
          />
        ))}
      </div>
    </div>
  );
};
