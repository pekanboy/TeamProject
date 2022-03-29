import React from 'react';

export const useDisplayImage = () => {
  const [result, setResult] = React.useState<string[]>([]);

  function uploader(e: any) {
    const promises: Promise<unknown>[] = [];
    const imageFiles = e.target.files;

    // Тут через промис олл сделать
    for (let i = 0; i < imageFiles.length; i++) {
      const newPromise = new Promise((resolve) => {
        resolve(URL.createObjectURL(imageFiles[i]));
      });
      promises.push(newPromise);
    }

    Promise.all(promises).then((result) => {
      setResult((prev: string[]) => [...prev, ...result] as string[]);
    });
  }

  return {result, uploader};
};
