import {Text, TextMode} from 'components/Text/Text';
import React from 'react';
import {CustomSelect, FormLayoutGroup, Input} from '@vkontakte/vkui';
import {ChipsSelect} from '@vkontakte/vkui/dist/unstable';
import style from 'components/Forms/CreateRouteForm/CreateRouteForm.module.css';
import {
  difficultPool,
  routeTypesPool,
  regionsPool,
} from 'components/Forms/CreateRouteForm/CreateRouteForm.const';

export interface CreateRouteFormProps {
  title: string;
}

export const CreateRouteForm: React.FC<CreateRouteFormProps> = ({title}) => {
  return (
    <div className={style.container}>
      <Text mode={TextMode.TITLE_1} className={style.header}>
        {title}
      </Text>
      <FormLayoutGroup mode={'horizontal'}>
        <CustomSelect options={difficultPool} />
        <CustomSelect options={routeTypesPool} />
        <CustomSelect options={regionsPool} />
      </FormLayoutGroup>
      <FormLayoutGroup mode={'horizontal'}>
        <Input type={'date'} />
        {/*<ChipsSelect {...colorsCopyChipsProps} />*/}
      </FormLayoutGroup>
    </div>
  );
};
