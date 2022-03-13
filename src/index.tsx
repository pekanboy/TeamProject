import React from 'react';
import ReactDOM from 'react-dom';
import {initApolloClient} from "./common/apollo/client";
import {ApolloProvider} from "@apollo/react-hooks";
import {CreateRoutePage} from './components/pages/CreateRoutePage/CreateRoutePage';
import './index.css';

const client = initApolloClient();

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
        <CreateRoutePage/>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
