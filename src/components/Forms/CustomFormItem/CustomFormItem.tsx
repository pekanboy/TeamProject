import React from 'react';
import {FormItem} from '@vkontakte/vkui';

import style from 'components/Forms/CustomFormItem/CustomFormItem.module.css';

export interface CustomFormItemProps {
  top?: string;
  className?: string;
}

export const CustomFormItem: React.FC<CustomFormItemProps> = ({
  children,
  ...props
}) => {
  return (
    <FormItem className={style.formItem} {...props}>
      {children}
    </FormItem>
  );
};
