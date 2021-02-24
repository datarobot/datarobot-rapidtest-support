// @ts-nocheck
import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAtom } from 'jotai';

import Header from 'components/Header';
import Footer from 'components/Footer';

// eslint-disable-next-line no-unused-vars
import { LoggedInRoutes, LoggedOutRoutes } from 'Routes';
import { authenticatedAtom } from 'store';
import { auth } from './services/firebase';

import './App.css';

const App = () => {
  const [authenticated, setAuthenticated] = useAtom(authenticatedAtom);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <main className="content">
          <Suspense fallback={<div>Loading</div>}>
            {authenticated ? <LoggedInRoutes /> : <LoggedOutRoutes />}
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
