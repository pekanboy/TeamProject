import React from 'react';
import {Navbar} from 'components/Navbar/Navbar';
import {Routes, Route} from 'react-router-dom';
import {CreateRoutePage} from 'pages/CreateRoutePage/CreateRoutePage';
import style from 'pages/pages.base.module.css';

export const Content: React.FC = () => {
  return (
    <div className={style.container}>
      <Navbar />
      <Routes>
        <Route path={'/route-create'} element={<CreateRoutePage />} />
      </Routes>
    </div>
  );
};
