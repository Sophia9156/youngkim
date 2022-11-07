import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/styledTheme';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from "react-redux";
import persistReducer, { rootSaga } from "./redux";
import createSagaMiddleware from "redux-saga";
//import { createLogger } from "redux-logger";
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const sagaMiddleware = createSagaMiddleware();

//const logger = createLogger({});
const store = configureStore({
  reducer: persistReducer,
  middleware: [sagaMiddleware],
});
const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
sagaMiddleware.run(rootSaga);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
