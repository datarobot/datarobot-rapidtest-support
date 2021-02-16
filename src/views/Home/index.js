import React from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

const Home = () => (
  <div className="flex full-height justify-around items-center">
    <Link to="/program-admin" className="bg-blue text-white homeCard">
      I’m running a testing program
    </Link>
    <section className="bg-green homeCard">I'm testing others</section>
    <section className="bg-orange homeCard">I'm getting tested</section>
  </div>
);

export default Home;
