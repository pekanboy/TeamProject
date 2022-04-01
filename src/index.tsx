import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import '@vkontakte/vkui/dist/vkui.css';
import 'leaflet/dist/leaflet.css';
import {Content} from 'pages/Content/Content';
import {BrowserRouter} from 'react-router-dom';
import {RouteProvider} from 'providers/RouteProvider';
import {AxiosProvider} from 'providers/AxiosProvider';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RouteProvider>
        <AxiosProvider>
          <Content />
        </AxiosProvider>
      </RouteProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
