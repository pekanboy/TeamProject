import {LatLng} from 'leaflet';
import {AltitudeGetURL} from 'configs/base.const';
import {customAxios} from 'hooks/axios/customAxios';

export const useAltitude = (
  onSuccess: (data: any) => void,
  onError: (x: string, y: number) => void,
) => {
  return async (positions: LatLng[]) => {
    const {data, error, code} = await customAxios({
      url: createAltitudeURL(positions),
    });

    if (error) {
      onError(error, Number(code));
      return null;
    }

    if (data) {
      onSuccess(data);
    }

    return data;
  };
};

const createAltitudeURL = (positions: LatLng[]) => {
  return `${AltitudeGetURL}/v1/test-dataset?locations=${positions
    .map((pos, index) => {
      let needPipeCharacter = true;

      if (index === positions.length - 1) {
        needPipeCharacter = false;
      }

      if (needPipeCharacter) {
        return `${pos.lng},${pos.lat}|`;
      } else {
        return `${pos.lng},${pos.lat}`;
      }
    })
    .join('')}`;
};
