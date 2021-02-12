import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'jotai';

import Header from 'components/Header';
import Footer from 'components/Footer';

import './App.css';

const Home = lazy(() => import('views/Home'));
const Sites = lazy(() => import('views/Sites'));
const Accounts = lazy(() => import('views/Accounts'));

const App = () => (
  <Provider>
    <Router>
      <div className="App">
        <Header />

        <Suspense fallback={<div>Loading</div>}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/sites" component={Sites} />
            <Route path="/accounts" component={Accounts} />
          </Switch>
        </Suspense>

        <Footer />
      </div>
    </Router>
  </Provider>
);

export default App;
