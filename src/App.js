// @ts-nocheck
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'jotai';

import './i18n';

import 'assets/styles/fonts.css';
import './index.css';

import 'react-toastify/dist/ReactToastify.min.css';

import AuthProvider from 'components/AuthProvider';

// eslint-disable-next-line no-unused-vars
import { Routes } from 'Routes';

import './App.css';

const App = () => (
  <AuthProvider>
    <Provider>
      <Router>
        <Routes />
      </Router>
    </Provider>
  </AuthProvider>
);

export default App;
