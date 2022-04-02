import {LatLng} from 'leaflet';
import {AltitudeGetURL} from 'configs/base.const';
import {customAxios} from 'hooks/axios/customAxios';

export const useAltitude = (
  onSuccess?: (data: any) => void,
  onError?: (x: string, y: number) => void,
) => {
  return async (positions: LatLng[]) => {
    if (!positions.length) {
      return positions;
    }

    const {data, message, code} = await customAxios({
      url: createAltitudeURL(positions),
    });

    if (code < 200 || code >= 300) {
      onError?.(message, Number(code));
      return null;
    }

    if (data) {
      data.results.forEach(
        (point: {elevation: number | undefined}, index: number) => {
          positions[index].alt = Math.trunc(point.elevation || 0);
        },
      );

      onSuccess?.(positions);
    }

    return positions;
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
