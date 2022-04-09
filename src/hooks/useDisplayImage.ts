import {Setter} from 'types/basic';

export const useDisplayImage = (setResult?: Setter<File[]>) => {
  function uploader(e: any) {
    const promises: Promise<unknown>[] = [];
    const imageFiles: File[] = e.target.files;
    // Тут через промис олл сделать
    for (let i = 0; i < imageFiles.length; i++) {
      const newPromise = new Promise((resolve) => {
        resolve(imageFiles[i]);
      });
      promises.push(newPromise);
    }

    Promise.all(promises).then((result) => {
      setResult?.((prev: File[]) => [...result, ...prev] as File[]);
    });
  }

  return {uploader};
};
