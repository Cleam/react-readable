import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import { createStore, applyMiddleware, compose } from 'redux';
// import reducer from './reducers';
// import { Provider } from 'react-redux';
// import logger from "redux-logger";
// import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// console.log('reducer::', reducer)
// const store = createStore(
//   reducer,
//   composeEnhancers(
//     applyMiddleware(logger)
//   )
// );

// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
  <BrowserRouter>
    {/* <Provider store={store}> */}
    <App />
    {/* </Provider> */}
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
