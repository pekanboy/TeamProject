import style from 'components/Information/RouteInfo/RouteInfo.module.css';
import React from 'react';
import {Text, TextMode} from 'components/Text/Text';
import {IRoute} from 'interfaces/IRoute';
import {IMarker} from 'components/Map/Marker/Marker.interface';

export interface RouteInfoProps {
  profileAvatar?: string;
  route: IRoute;
  selectedLabel?: IMarker;
}

export const RouteInfo: React.FC<RouteInfoProps> = ({
  profileAvatar,
  route,
  selectedLabel,
}) => {
  const {title, difficult, days, type, bestTimeToGo, description} = route;

  return (
    <div className={style.container}>
      <img
        className={style.avatar}
        src={profileAvatar}
        alt="Аватар пользователя"
      />
      <Text mode={TextMode.TITLE_2} className={style.title}>
        {title}
      </Text>
      {/* Todo: Сделать звездочки */}
      <div className={style.scrollbar}>
        <div className={style.info}>
          <Text mode={TextMode.TEXT_2} className={style.infoText}>
            Сложность: {difficult}/5
          </Text>
          <Text mode={TextMode.TEXT_2} className={style.infoText}>
            Время маршрута: {days} дней
          </Text>
          <Text mode={TextMode.TEXT_2} className={style.infoText}>
            Тип похода: {type}
          </Text>
          <Text mode={TextMode.TEXT_2} className={style.infoText}>
            Лучшее время: {bestTimeToGo}
          </Text>
        </div>
        <Text mode={TextMode.TEXT_2} className={style.description}>
          {description}
        </Text>
      </div>
    </div>
  );
};
