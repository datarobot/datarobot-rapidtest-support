import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from 'components/Header';
import Footer from 'components/Footer';

import './App.css';

const Home = lazy(() => import('views/Home'));

const App = () => (
  <Suspense fallback={<div>Loading</div>}>
    <Router>
      <div className="App">
        <Header />

        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>

        <Footer />
      </div>
    </Router>
  </Suspense>
);

export default App;
