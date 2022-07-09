/**
 *
 *  TODO: Tasks
 * * auth - DONE
 * * upload image - DONE
 * * main page - Done
 * * Payment - in progress
 * *
 *
 */

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// * Packages
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
// * Reducers
import authReducer from "./store/reducers/auth/index";
import interfaceReducer from "./store/reducers/interface/index";
import productsReducer from "./store/reducers/database/products/index";
import walletReducer from "./store/reducers/database/wallet/index";

// * Sagas
import { watchAuth } from "./store/saga/index";
import { watchProducts } from "./store/saga/index";
import { watchWallet } from "./store/saga/index";

const composeEnhancers =
  (process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null) || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  interface: interfaceReducer,
  products: productsReducer,
  wallet: walletReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchProducts);
sagaMiddleware.run(watchWallet);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
