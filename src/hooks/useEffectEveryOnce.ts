import {useEffect, useState} from 'react';

export const useEffectEveryOnce = (
  callback: () => void,
  dependences: boolean[],
) => {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isComplete && dependences.every(Boolean)) {
      callback();
      setIsComplete(true);
    }
  }, dependences);
};
