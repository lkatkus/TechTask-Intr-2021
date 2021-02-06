import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import App from './App';
import GlobalStyle from './theme/global-style';
import rootReducer, { initialRootState } from './redux';

const store = createStore(
  rootReducer,
  initialRootState,
  composeWithDevTools(applyMiddleware(thunk)),
);

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </React.StrictMode>
);

ReactDOM.render(app, document.getElementById('root'));
