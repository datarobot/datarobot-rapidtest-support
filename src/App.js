// @ts-nocheck
import React, { useContext, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Loading from 'components/Loading';
import { AuthContext } from 'components/AuthProvider';

// eslint-disable-next-line no-unused-vars
import { Routes } from 'Routes';

import './App.css';

const App = () => {
  const { authenticated, loadingAuthState, user } = useContext(AuthContext);

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
            {loadingAuthState ? (
              <Loading
                color="#00528D"
                size={256}
                containerClassName="full-height"
              />
            ) : (
              <Routes authenticated={authenticated} roles={user?.roles} />
            )}
          </Suspense>
        </main>
        <Footer />
        <ToastContainer
          position="bottom-center"
          toastClassName="rt-toast"
          autoClose={2500}
        />
      </div>
    </Router>
  );
};

export default App;
