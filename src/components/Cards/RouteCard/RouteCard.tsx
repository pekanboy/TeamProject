import style from 'components/Cards/RouteCard/RouteCard.module.css';
import React from 'react';
import classNames from 'classnames';
import {NavLink} from 'components/Links/NavLink/NavLink';
import {difficultPool} from 'components/Forms/CreateRouteForm/CreateRouteForm.const';
import arrow from 'image/arrow.svg';
import {useLocation} from 'wouter';
import {GetRoutePath} from 'configs/base.const';
import {TextMode} from 'components/Text/Text';

export interface RouteCardProps {
  className?: string;
  image: string;
  title: string;
  difficult: number;
  region: string;
  days: number;
  description: string;
  id?: number;
}

export const RouteCard: React.FC<RouteCardProps> = ({
  className,
  image,
  title,
  difficult,
  region,
  days,
  description,
  id,
}) => {
  const [, setLocation] = useLocation();

  return (
    <div
      className={classNames(style.container, className)}
      onClick={() => {
        setLocation(GetRoutePath(id || -1));
      }}
    >
      <div
        className={style.img}
        style={{
          backgroundImage: `linear-gradient(359.13deg, rgba(0, 0, 0, 0.8) -14.29%, rgba(0, 0, 0, 0) 49.98%), url(${image})`,
        }}
      >
        <div className={style.dificult}>{`Сложность: ${
          difficultPool[difficult - 1].label
        }`}</div>
        <div className={style.title}>{title}</div>
      </div>
      <div className={style.content}>
        <div className={style.info}>
          <div>{region}</div>
          <div>{`${days} дня`}</div>
        </div>
        <div className={style.description}>{description}</div>
        <NavLink
          className={style.more}
          path={`/route/${id}`}
          textMode={TextMode.TEXT}
          after={
            <img
              className={style.arrow}
              src={arrow}
              alt={'Кнопка "подробнее"'}
            />
          }
        >
          Подробнее
        </NavLink>
      </div>
    </div>
  );
};
