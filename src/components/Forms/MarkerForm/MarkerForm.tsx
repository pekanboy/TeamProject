import React, {FormEvent, useEffect, useState} from 'react';
import {
  Button,
  ButtonGroup,
  FormLayout as Form,
  FormLayoutGroup as FormGroup,
  Input,
  Textarea,
} from '@vkontakte/vkui';
import {IMarker} from 'components/Map/Marker/Marker.interface';
import {LatLng} from 'leaflet';
import {CustomFormItem} from 'components/Forms/CustomFormItem/CustomFormItem';
import style from 'components/Forms/MarkerForm/MarkerForm.module.css';
import {Text, TextMode} from 'components/Text/Text';

export interface MarkerFormProps {
  label: IMarker;
  setLabel: (x: IMarker, needClose?: boolean) => void;
  close: VoidFunction;
  className?: string;
}

export const MarkerForm: React.FC<MarkerFormProps> = ({
  label,
  setLabel,
  close,
  className,
}) => {
  const [currentMarker, setCurrentMarker] = useState<IMarker>(label);

  useEffect(() => {
    setCurrentMarker(label);
  }, [label.position.toString()]);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    setLabel(currentMarker, true);
  };

  return (
    <Form onSubmit={submitHandler} className={className}>
      <CustomFormItem top={'Название метки'}>
        <Input
          maxLength={100}
          placeholder={'Введите название метки'}
          type={'text'}
          value={currentMarker?.title || ''}
          onChange={(event) => {
            setCurrentMarker((prev) => ({
              ...prev,
              title: event.target.value,
            }));
          }}
        />
      </CustomFormItem>
      <CustomFormItem top={'Описание метки'}>
        <Textarea
          value={currentMarker?.description || ''}
          placeholder={'Введите название метки'}
          rows={1}
          onChange={(event) => {
            setCurrentMarker((prev) => ({
              ...prev,
              description: event.target.value,
            }));
          }}
        />
      </CustomFormItem>
      <FormGroup mode="horizontal">
        <CustomFormItem top="Широта" className={style.lat}>
          <Input
            value={currentMarker.position.lng}
            type={'number'}
            placeholder={'Введите широту метки'}
            onChange={(event) => {
              setCurrentMarker((prev) => ({
                ...prev,
                position: new LatLng(
                  prev.position.lat,
                  Number(event.target.value),
                ),
              }));
            }}
          />
        </CustomFormItem>
        <CustomFormItem top="Долгота" className={style.lng}>
          <Input
            type={'number'}
            value={currentMarker.position.lat}
            placeholder={'Введите долготу метки'}
            onChange={(event) => {
              setCurrentMarker((prev) => ({
                ...prev,
                position: new LatLng(
                  Number(event.target.value),
                  prev.position.lng,
                ),
              }));
            }}
          />
        </CustomFormItem>
      </FormGroup>
      <CustomFormItem>
        <ButtonGroup mode={'horizontal'} className={style.submitContainer}>
          <Button
            onClick={submitHandler}
            mode={'primary'}
            className={style.submit}
          >
            <Text mode={TextMode.TEXT}>Сохранить</Text>
          </Button>
          <Button onClick={close} mode={'primary'} className={style.submit}>
            <Text mode={TextMode.TEXT}>Отменить</Text>
          </Button>
        </ButtonGroup>
      </CustomFormItem>
    </Form>
  );
};
