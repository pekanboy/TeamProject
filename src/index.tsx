import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import '@vkontakte/vkui/dist/vkui.css';
import 'leaflet/dist/leaflet.css';
import {Content} from 'pages/Content/Content';
import {BrowserRouter} from 'react-router-dom';
import {RouteProvider} from 'providers/RouteProvider';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RouteProvider>
        <Content />
      </RouteProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
