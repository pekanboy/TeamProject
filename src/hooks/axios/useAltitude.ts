import {LatLng} from 'leaflet';
import useAxios from 'axios-hooks';
import {AltitudeGetURL} from 'configs/base.const';

export const useAltitude = (
  onSuccess: (data: any) => void,
  onError: (x: string, y: number) => void,
) => {
  return (positions: LatLng[]) => {
    const [{data, error}] = useAxios(createAltitudeURL(positions));

    if (error) {
      onError(error.name, Number(error.code));
    }

    if (data) {
      console.log(data);
      return data;
    }
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
