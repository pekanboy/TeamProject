import {IRoute} from 'interfaces/IRoute';
import {customAxios} from 'hooks/axios/customAxios';
import {
  FilesRoutePath,
  GetFilesRoutePathPut,
  URLToSendRequests,
} from 'configs/base.const';

export const useSendFile = async (files: string[], route: IRoute) => {
  const sendMetadata = async (file: string) => {
    const fileSplit = file.split('/');
    const fileName = fileSplit[fileSplit.length - 1];

    return customAxios({
      url: `${URLToSendRequests}${FilesRoutePath}`,
      method: 'POST',
      data: {
        filename: fileName,
        owner: 'route',
        owner_id: route.id,
      },
    });
  };

  const sendFile = async (file: string, id: number) => {
    return customAxios({
      url: `${URLToSendRequests}${GetFilesRoutePathPut(id)}`,
      method: 'PUT',
      data: null,
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    });
  };

  const {data, code, message} = await sendMetadata(files[0]);
  if (code < 200 || code >= 300) {
    console.error('Error metadata file', message);
    return;
  }

  const result = await sendFile(files[0], data.id);

  if (result.code < 200 || result.code >= 300) {
    console.error('Error file', message);
    return;
  }

  return result.data;
};
