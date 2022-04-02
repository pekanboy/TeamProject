import React, {useRef} from 'react';
import {
  CustomSelect,
  FormLayoutGroup,
  Input,
  Textarea,
  Button,
} from '@vkontakte/vkui';
import {ChipsSelect} from '@vkontakte/vkui/dist/unstable';
import style from 'components/Forms/CreateRouteForm/CreateRouteForm.module.css';
import {
  difficultPool,
  routeTypesPool,
  regionsPool,
  commonThingsPool,
  niceTime,
} from 'components/Forms/CreateRouteForm/CreateRouteForm.const';
import classNames from 'classnames';
import {ChipsInputOption} from '@vkontakte/vkui/dist/components/ChipsInput/ChipsInput';
import {Gallery} from 'components/Gallery/Gallery';
import {IRoute} from 'interfaces/IRoute';

export interface CreateRouteFormProps {
  title?: string;
  className?: string;
  onCreateRoute?: (x: IRoute) => void;
}

export const CreateRouteForm: React.FC<CreateRouteFormProps> = ({
  title,
  className,
  onCreateRoute,
}) => {
  const [selectedThings, setSelectedThings] = React.useState<
    ChipsInputOption[]
  >([]);

  const thingsChipsProps = {
    value: selectedThings,
    onChange: setSelectedThings,
    options: commonThingsPool,
    placeholder: 'Список вещей, которые стоит взять с собой',
    creatable: true,
  };

  const titleRef = useRef<HTMLInputElement>();
  const difficultRef = useRef<HTMLSelectElement>();
  const typeRef = useRef<HTMLSelectElement>();
  const regionRef = useRef<HTMLSelectElement>();
  const daysRef = useRef<HTMLInputElement>();
  const thingsRef = useRef<HTMLInputElement>();
  const descRef = useRef<HTMLTextAreaElement>();
  const niceTimeRef = useRef<HTMLSelectElement>();
  const [result, setResult] = React.useState<string[]>([]);

  const onSubmit = () => {
    // Todo Прикрутить валидацию

    onCreateRoute?.({
      title: titleRef.current?.value || '',
      difficult: Number(difficultRef.current?.value),
      type: typeRef.current?.value || '',
      region: regionRef.current?.value || '',
      days: Number(daysRef.current?.value),
      description: descRef.current?.value || '',
      routePoints: [],
      markers: [],
      needModerate: false,
      bestTimeToGo: niceTimeRef.current?.value,
      things: thingsRef.current?.value?.split('\n') || [],
      distance: 0,
      photos: result,
    });
  };

  return (
    <div className={classNames(className, style.container)}>
      <Input
        getRef={(ref) => (titleRef.current = ref || undefined)}
        type={'text'}
        className={style.header}
        placeholder={'Введите название маршрута'}
        value={title}
        role={'cell'}
      />
      <FormLayoutGroup className={style.box} mode={'horizontal'}>
        <FormLayoutGroup className={style.leftColumn} mode={'vertical'}>
          <CustomSelect
            getRef={(ref) => (difficultRef.current = ref || undefined)}
            placeholder={'Выберите сложность'}
            className={style.select}
            options={difficultPool}
          />
          <CustomSelect
            placeholder={'Выберите тип маршрута'}
            getRef={(ref) => (typeRef.current = ref || undefined)}
            className={classNames(style.select, style.centerSelect)}
            options={routeTypesPool}
          />
          <CustomSelect
            className={style.select}
            getRef={(ref) => (regionRef.current = ref || undefined)}
            placeholder={'Выберите регион'}
            options={regionsPool}
          />
          <CustomSelect
            className={style.select}
            getRef={(ref) => (niceTimeRef.current = ref || undefined)}
            placeholder={'Наилучший сезон'}
            options={niceTime}
          />
          <Input
            getRef={(ref) => (daysRef.current = ref || undefined)}
            type={'number'}
            placeholder={'Количество дней маршрута'}
            className={style.days}
          />
        </FormLayoutGroup>
        <FormLayoutGroup mode={'vertical'} className={style.rightColumn}>
          <ChipsSelect
            getRef={(ref) => (thingsRef.current = ref || undefined)}
            className={style.chipSelect}
            {...thingsChipsProps}
          />
          <Textarea
            getRef={(ref) => (descRef.current = ref || undefined)}
            placeholder={'Введите описание маршрута'}
            grow={false}
            autoFocus={true}
            className={style.textarea}
          />
        </FormLayoutGroup>
      </FormLayoutGroup>
      <Gallery
        className={style.box}
        slideWith={270}
        result={result}
        setResult={setResult}
      />
      <Button mode={'secondary'} className={style.submit} onClick={onSubmit}>
        ОПУБЛИКОВАТЬ
      </Button>
    </div>
  );
};
