import {CustomFormItem} from 'components/Forms/CustomFormItem/CustomFormItem';
import style from 'components/Gallery/Gallery.module.css';
import {ImagePickerButton} from 'components/Buttons/ImagePickerButton/ImagePickerButton';
import React, {useEffect} from 'react';
import {useDisplayImage} from 'hooks/useDisplayImage';
import {Gallery as GalleryComponent} from '@vkontakte/vkui';
import classNames from 'classnames';

export interface GalleryProps {
  onChangeGallery?: (x: any[]) => void;
  className?: string;
  slideWith: number;
}

export const Gallery: React.FC<GalleryProps> = ({
  onChangeGallery,
  className,
  slideWith,
}) => {
  const {result, uploader} = useDisplayImage();

  useEffect(() => {
    onChangeGallery?.(result);
  }, [onChangeGallery, result]);

  return (
    <CustomFormItem className={classNames(style.container, className)}>
      <ImagePickerButton
        className={style.filePicker}
        setImage={(files) => {
          uploader(files);
        }}
      />
      <GalleryComponent
        className={style.gallery}
        slideWidth={slideWith}
        isDraggable={true}
        showArrows={true}
      >
        {result.map((src: string | undefined) => {
          return (
            <img
              className={style.img}
              src={src}
              key={`image-${result.slice(0, 256).toString()}`}
            />
          );
        })}
      </GalleryComponent>
    </CustomFormItem>
  );
};
