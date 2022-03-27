import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import '@vkontakte/vkui/dist/vkui.css';
import 'leaflet/dist/leaflet.css';
import {Content} from 'pages/pages.base';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Content />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
