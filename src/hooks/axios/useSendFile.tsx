import {IRoute} from 'interfaces/IRoute';
import {customAxios} from 'hooks/axios/customAxios';
import {
  FilesRoutePath,
  GetFilesRoutePathPut,
  URLToSendRequests,
} from 'configs/base.const';

export const useSendFile = async (files: File[], route: IRoute) => {
  const sendMetadata = async (file: File) => {
    return customAxios({
      url: `${URLToSendRequests}${FilesRoutePath}`,
      method: 'POST',
      data: {
        filename: file.name,
        owner: 'route',
        owner_id: route.id,
      },
    });
  };

  const sendFile = async (file: File, id: number) => {
    const arrayBuffer = await file.arrayBuffer();

    return customAxios({
      url: `${URLToSendRequests}${GetFilesRoutePathPut(id)}`,
      method: 'PUT',
      data: arrayBuffer,
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
