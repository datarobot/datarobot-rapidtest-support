// @ts-nocheck
import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'jotai';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  // IfFirebaseAuthed,
  // IfFirebaseAuthedAnd
} from '@react-firebase/auth';

import Header from 'components/Header';
import Footer from 'components/Footer';

import { LoggedInRoutes, LoggedOutRoutes } from 'Routes';

import { FIREBASE_CONFIG } from 'rt-constants';

import './App.css';

const App = () => {
  console.log(firebase);
  return (
    <Provider>
      <Router>
        <div className="App">
          <FirebaseAuthProvider {...FIREBASE_CONFIG} firebase={firebase}>
            <Header />
            <main className="content">
              <Suspense fallback={<div>Loading</div>}>
                <FirebaseAuthConsumer>
                  {({ isSignedIn }) => {
                    if (isSignedIn === true) {
                      return <LoggedInRoutes />;
                    }
                    return <LoggedOutRoutes />;
                  }}
                </FirebaseAuthConsumer>
              </Suspense>
            </main>
            <Footer />
          </FirebaseAuthProvider>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
