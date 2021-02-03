import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App';
import GlobalStyle from './theme/global-style';

const queryClient = new QueryClient();

const app = (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

ReactDOM.render(app, document.getElementById('root'));
