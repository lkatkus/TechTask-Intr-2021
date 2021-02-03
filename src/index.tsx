import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import GlobalStyle from './theme/global-style';

const app = (
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);

ReactDOM.render(app, document.getElementById('root'));
