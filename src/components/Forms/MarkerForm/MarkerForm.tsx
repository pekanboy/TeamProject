import React, {FormEvent, useEffect, useState} from 'react';
import {
  FormLayout as Form,
  Input,
  Textarea,
  ButtonGroup,
  Button,
  FormLayoutGroup as FormGroup,
} from '@vkontakte/vkui';
import {IMarker} from 'components/Map/Marker/Marker.interface';
import {LatLng} from 'leaflet';
import {CustomFormItem} from 'components/Forms/CustomFormItem/CustomFormItem';

export interface MarkerFormProps {
  label: IMarker;
  setLabel: (x: IMarker, needClose?: boolean) => void;
  close: VoidFunction;
}

export const MarkerForm: React.FC<MarkerFormProps> = ({
  label,
  setLabel,
  close,
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
    <Form onSubmit={submitHandler}>
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
        <CustomFormItem top="Широта">
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
        <CustomFormItem top="Долгота">
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
        <ButtonGroup mode={'horizontal'}>
          <Button onClick={submitHandler}>Сохранить</Button>
          <Button onClick={close}>Отменить</Button>
        </ButtonGroup>
      </CustomFormItem>
    </Form>
  );
};
