import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './stores/reducer/index';

// StyleSheet
import './resources/scss/index.scss';
import 'antd/dist/antd.css';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancer());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
