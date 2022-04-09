import {CustomFormItem} from 'components/Forms/CustomFormItem/CustomFormItem';
import style from 'components/Gallery/Gallery.module.css';
import {ImagePickerButton} from 'components/Buttons/ImagePickerButton/ImagePickerButton';
import React, {useEffect} from 'react';
import {useDisplayImage} from 'hooks/useDisplayImage';
import {Gallery as GalleryComponent} from '@vkontakte/vkui';
import classNames from 'classnames';
import {Setter} from 'types/basic';

export interface GalleryProps {
  onChangeGallery?: (x: any[]) => void;
  className?: string;
  slideWith: number;
  result: File[] | string[];
  setResult?: Setter<File[]>;
  needPicker?: boolean;
}

export const Gallery: React.FC<GalleryProps> = ({
  onChangeGallery,
  className,
  slideWith,
  result,
  setResult,
  needPicker = true,
}) => {
  const {uploader} = useDisplayImage(setResult);

  useEffect(() => {
    onChangeGallery?.(result);
  }, [onChangeGallery, result]);

  return (
    <CustomFormItem className={classNames(style.container, className)}>
      {needPicker && (
        <ImagePickerButton
          className={style.filePicker}
          setImage={(files) => {
            uploader(files);
          }}
        />
      )}
      <GalleryComponent
        className={style.gallery}
        slideWidth={slideWith}
        isDraggable={true}
        showArrows={true}
      >
        {!result.length && (
          <div className={style.noPhoto}>Фотографии не выбраны</div>
        )}
        {result.map((src: Blob | string) => {
          return (
            <img
              className={style.img}
              src={typeof src === 'string' ? src : URL.createObjectURL(src)}
              key={`image-${result.slice(0, 256).toString()}`}
            />
          );
        })}
      </GalleryComponent>
    </CustomFormItem>
  );
};
