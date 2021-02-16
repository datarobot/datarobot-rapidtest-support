import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'jotai';

import Header from 'components/Header';
import Footer from 'components/Footer';

import Routes from 'Routes';

import './App.css';

const App = () => (
  <Provider>
    <Router>
      <div className="App">
        <Header />
        <Suspense fallback={<div>Loading</div>}>
          <Routes />
        </Suspense>
        <Footer />
      </div>
    </Router>
  </Provider>
);

export default App;
