import {TextMode} from 'components/Text/Text';
import React from 'react';
import style from 'components/Navbar/Navbar.module.css';
import like from 'image/like.svg';
import profile from 'image/profile.svg';
import notice from 'image/notice.svg';
import {NavLink} from 'components/Links/NavLink/NavLink';

export const Navbar: React.FC = () => {
  return (
    <div className={style.container}>
      <NavLink className={style.logoWidth} path={'/'} textMode={TextMode.LOGO}>
        TRAVELITE
      </NavLink>
      <div className={style.centerGroup}>
        <NavLink
          className={style.centerText}
          path={'/routes'}
          textMode={TextMode.HEADLINE2}
        >
          Маршруты
        </NavLink>
        <NavLink
          className={style.centerText}
          path={'/map'}
          textMode={TextMode.HEADLINE2}
        >
          Посмотреть на карте
        </NavLink>
        <NavLink
          className={style.centerText}
          path={'/route-create'}
          textMode={TextMode.HEADLINE2}
        >
          Создать маршрут
        </NavLink>
      </div>
      <div className={style.iconsContainer}>
        <img className={style.notice} src={notice} alt="Уведомления" />
        <img className={style.like} src={like} alt="Понравившееся" />
        <img className={style.profile} src={profile} alt="Профиль" />
      </div>
    </div>
  );
};
