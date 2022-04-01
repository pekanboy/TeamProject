import React, {useRef, useState} from 'react';
import {Button, Input} from '@vkontakte/vkui';
import gallery from 'image/gallery.svg';
import {Text, TextMode} from 'components/Text/Text';
import classNames from 'classnames';
import style from 'components/Buttons/ImagePickerButton/ImagePickerButton.module.css';

export interface ImagePickerButtonProps {
  className?: string;
  setImage?: (x: any) => void;
}

export const ImagePickerButton: React.FC<ImagePickerButtonProps> = ({
  className,
  setImage,
}) => {
  const inputRef = useRef<HTMLInputElement>();

  return (
    <div className={classNames(className, style.container)}>
      <Input
        getRef={(ref) => {
          inputRef.current = ref || undefined;
        }}
        onChange={setImage}
        multiple={true}
        accept={'image/*'}
        type={'file'}
        className={style.input}
      />
      <Button
        onClick={() => {
          inputRef.current?.click();
        }}
        appearance={'neutral'}
        className={style.button}
      >
        <img src={gallery} alt="Загрузить фотографию" />
        <Text mode={TextMode.TEXT_3}>Загрузить фото</Text>
      </Button>
    </div>
  );
};
