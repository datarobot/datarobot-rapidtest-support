import React from 'react';
import { Link } from 'react-router-dom';

import HomePageCard from 'components/HomePageCard';

import testKit from '../../assets/images/test-kit.svg';
import gettingTested from '../../assets/images/getting-tested.svg';
import testingOthers from '../../assets/images/testing-others.svg';
import './Home.css';

const Home = () => (
  <div className="full-height">
    <div className="hero flex mt-12">
      <section className="w-3/5 pr-24 flex flex-col content-between items-between justify-between">
        <h1 className="headline text-dark-grey">
          Application for <span className="text-purple">testing programs</span>{' '}
          at K-12 schools that keeps teachers and children safe
        </h1>

        <div className="btn-row mb-6">
          <Link to="/other" className="btn-primary mr-6 py-3" role="button">
            Join a program
          </Link>
          <Link
            to="/program-admin"
            className="btn-outline-primary py-3"
            role="button"
          >
            Start a program
          </Link>
        </div>
      </section>
      <div className="flex w-1/3 justify-end">
        <img src={testKit} alt="test kit" className="w-3/4" />
      </div>
    </div>

    <div className="flex mt-12">
      <HomePageCard
        text="I'm getting tested"
        subText="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        image={gettingTested}
      />
      <HomePageCard
        text="I'm testing others"
        subText="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        image={testingOthers}
      />
    </div>
  </div>
);

export default Home;
