// @ts-nocheck
import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAtom } from 'jotai';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Loading from 'components/Loading';

// eslint-disable-next-line no-unused-vars
import { Routes } from 'Routes';
import { authenticatedAtom } from 'store';
import { auth } from './services/firebase';

import './App.css';

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [authenticated, setAuthenticated] = useAtom(authenticatedAtom);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        /**
         * TODO
         * FIX THIS TERRIBLE HACKY WORK AROUND BEFORE ACTUAL PROD RELEASE
         */
        localStorage.setItem('authenticated', true);
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        localStorage.setItem('authenticated', false);
      }
    });

    console.log(authenticated);
  }, [authenticated]);

  return (
    <Router>
      <div className="App">
        <Header />
        <main className="content">
          <Suspense
            fallback={
              <Loading
                color="#00528D"
                size={256}
                containerClassName="full-height"
              />
            }
          >
            <Routes authenticated={authenticated} />
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
