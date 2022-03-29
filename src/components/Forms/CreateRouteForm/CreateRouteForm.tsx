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
} from 'components/Forms/CreateRouteForm/CreateRouteForm.const';
import classNames from 'classnames';
import {ChipsInputOption} from '@vkontakte/vkui/dist/components/ChipsInput/ChipsInput';
import {CustomFormItem} from 'components/Forms/CustomFormItem/CustomFormItem';
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

  const onSubmit = () => {
    debugger;
    onCreateRoute?.({
      title: titleRef.current?.value || '',
      difficult: Number(difficultRef.current?.value),
      type: typeRef.current?.value || '',
      region: regionRef.current?.value || '',
      travelTime: Number(daysRef.current?.value),
      description: descRef.current?.value || '',
      routePoints: [],
      markers: [],
      needModerate: false,
      bestTimeToGo: 'Лето', // Todo
    });
  };

  return (
    <div className={classNames(style.container, className)}>
      <Input
        getRef={(ref) => (titleRef.current = ref || undefined)}
        type={'text'}
        className={style.header}
        placeholder={'Введите название маршрута'}
        value={title}
      />
      <FormLayoutGroup className={style.box} mode={'horizontal'}>
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
      </FormLayoutGroup>
      <FormLayoutGroup mode={'horizontal'} className={style.box}>
        <Input
          getRef={(ref) => (daysRef.current = ref || undefined)}
          type={'number'}
          placeholder={'Количество дней маршрута'}
          className={style.date}
        />
        <ChipsSelect
          getRef={(ref) => (thingsRef.current = ref || undefined)}
          className={style.chipSelect}
          {...thingsChipsProps}
        />
      </FormLayoutGroup>
      <CustomFormItem className={style.box}>
        <Textarea
          getRef={(ref) => (descRef.current = ref || undefined)}
          placeholder={'Введите описание маршрута'}
          rows={5}
          grow={false}
          className={style.textarea}
        />
      </CustomFormItem>
      <Gallery className={style.box} slideWith={270} />
      <Button mode={'secondary'} className={style.submit} onClick={onSubmit}>
        Опубликовать
      </Button>
    </div>
  );
};
