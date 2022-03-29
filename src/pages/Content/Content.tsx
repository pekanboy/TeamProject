import React from 'react';
import {Navbar} from 'components/Navbar/Navbar';
import {Routes, Route} from 'react-router-dom';
import {CreateRoutePage} from 'pages/CreateRoutePage/CreateRoutePage';
import style from 'pages/Content/Content.module.css';

export const Content: React.FC = () => {
  return (
    <div className={style.container}>
      <Navbar />
      <div className={style.page}>
        <Routes>
          <Route path={'/route-create'} element={<CreateRoutePage />} />
        </Routes>
      </div>
    </div>
  );
};
