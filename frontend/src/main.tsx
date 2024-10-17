import {createRoot} from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux';
import {persistor, store} from './app/store';
import {ThemeProvider} from '@mui/material';
import {BrowserRouter} from 'react-router-dom';
import theme from './theme';
import {PersistGate} from 'redux-persist/integration/react';
import {addInterceptors} from './axiosApi';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {GOOGLE_CLIENT_ID} from './constants';

addInterceptors(store);

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App/>
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>
);