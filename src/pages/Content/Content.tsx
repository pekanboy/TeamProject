import React from 'react';
import {Navbar} from 'components/Navbar/Navbar';
import {Route} from 'wouter';
import {CreateRoutePage} from 'pages/CreateRoutePage/CreateRoutePage';
import style from 'pages/Content/Content.module.css';
import {RoutePage} from 'pages/RoutePage/RoutePage';
import {AllRoutes} from 'pages/AllRoutes/AllRoutes';
import {MapPage} from 'pages/Map/Map';

export const Content: React.FC = () => {
  return (
    <div className={style.container}>
      <Navbar />
      <div className={style.page}>
        <Route path={'/route-create'}>
          <CreateRoutePage />
        </Route>
        <Route path={'/route/:id'}>
          {(params) => <RoutePage id={Number(params.id)} />}
        </Route>
        <Route path={'/routes'}>
          <AllRoutes />
        </Route>
        <Route path={'/'}>
          <AllRoutes />
        </Route>
        <Route path={'/map'}>
          <MapPage />
        </Route>
      </div>
    </div>
  );
};
