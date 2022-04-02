import React from 'react';
import ReactDOM from 'react-dom';
import {AdaptivityProvider, ConfigProvider} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import 'leaflet/dist/leaflet.css';
import 'index.css';
import {Content} from 'pages/Content/Content';
import {BrowserRouter} from 'react-router-dom';
import {RouteProvider} from 'providers/RouteProvider';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider>
        <AdaptivityProvider>
          <RouteProvider>
            <Content />
          </RouteProvider>
        </AdaptivityProvider>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
