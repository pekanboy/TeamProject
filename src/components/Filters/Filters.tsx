import style from 'components/Filters/Filters.module.css';
import React, {useRef} from 'react';
import {Input, FormLayoutGroup, CustomSelect} from '@vkontakte/vkui';
import {
  difficultPool,
  routeTypesPool,
} from 'components/Forms/CreateRouteForm/CreateRouteForm.const';
import classNames from 'classnames';
import search from 'image/search.svg';
import {IFilter} from 'interfaces/IFilter';

export interface FiltersProps {
  className?: string;
  onFilterSelect?: (x: IFilter) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  className,
  onFilterSelect,
}) => {
  const searchRef = useRef<HTMLInputElement>();
  const typeRef = useRef<HTMLSelectElement>();
  const difficultRef = useRef<HTMLSelectElement>();
  const daysRef = useRef<HTMLInputElement>();
  const sortRef = useRef<HTMLSelectElement>();

  const onSearch = () => {
    const filters: IFilter = {
      search: searchRef.current?.value || undefined,
      type: typeRef.current?.value || undefined,
      difficult:
        (Number(difficultRef.current?.value) && [
          Number(difficultRef.current?.value),
          Number(difficultRef.current?.value),
        ]) ||
        undefined,
      days:
        (Number(daysRef.current?.value) && [
          Number(daysRef.current?.value),
          Number(daysRef.current?.value),
        ]) ||
        undefined,
      sort: sortRef.current?.value || undefined,
    };

    onFilterSelect?.(filters);
  };

  return (
    <div className={classNames(style.container, className)}>
      <Input
        getRef={(ref) => (searchRef.current = ref || undefined)}
        placeholder={'Введите место нахождения маршрута'}
        className={style.search}
        after={
          <img
            src={search}
            onClick={onSearch}
            className={style.searchImg}
            alt="Найти"
          />
        }
      />
      <FormLayoutGroup mode={'horizontal'} className={style.group}>
        <CustomSelect
          getRef={(ref) => (typeRef.current = ref || undefined)}
          placeholder={'Тип маршрута'}
          className={style.select}
          options={[{value: '', label: 'Любой'}, ...routeTypesPool]}
        />
        <CustomSelect
          getRef={(ref) => (difficultRef.current = ref || undefined)}
          placeholder={'Сложность'}
          className={style.select}
          options={[{value: '', label: 'Любая'}, ...difficultPool]}
        />
        <Input
          getRef={(ref) => (daysRef.current = ref || undefined)}
          type={'number'}
          placeholder={'Количество дней'}
          className={style.select}
        />
        <CustomSelect
          getRef={(ref) => (sortRef.current = ref || undefined)}
          placeholder={'Сортировка'}
          className={style.select}
          options={[
            {value: '', label: 'Неважно'},
            {value: 'По рейтингу', label: 'По рейтингу'},
            {value: 'По продолжительности', label: 'По набору высоты'},
          ]}
        />
      </FormLayoutGroup>
    </div>
  );
};
