// pages/_app.js
import React from 'react';
import { Provider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import store from '../store/store';

const MyApp = ({ Component, pageProps }) => (
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Component {...pageProps} />
    </LocalizationProvider>
  </Provider>
);

export default MyApp;
