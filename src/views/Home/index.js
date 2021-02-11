import React from 'react';

import './Home.css';

const Home = () => (
  <div>
    <h1 className="text-3xl pt-12 pb-2 font-bold">Welcome!</h1>
    <p>Here you will find some information about COVID</p>

    <div className="cards pt-8 grid grid-cols-3 grid-rows-2 gap-4">
      <div className="card first bg-green col-span-2">
        <p className="text-3xl font-bold pb-4">Request an account</p>
        <p className="max-w-md">
          Sometimes horses cough and fart at the same time, so stay out of the
          range of its butt muscle because a horses butt muscle is thick.
        </p>
        <p className="pt-4 font-bold">What's this?</p>
      </div>
      <div className="card bg-red">
        <p className="text-xl font-bold pb-4">Request a program</p>
        <p>
          It's OK to get rib grease on your face, because you're allowing people
          to see that you're proud of these ribs.
        </p>
        <p className="pt-4 font-bold">What's this?</p>
      </div>
      <div className="card bg-orange">
        <p className="text-xl font-bold pb-4">Training Materials</p>
        <p>
          You ever roasted doughnuts? I would like to give you a backstage pass
          to my imagination.
        </p>
        <p className="pt-4 font-bold">What's this?</p>
      </div>
      <div className="card bg-light-blue">
        <p className="text-xl font-bold pb-4">View the FAQ</p>
        <p>You gotta go through it to see there ain't nothing to it.</p>
        <p className="pt-4 font-bold">What's this?</p>
      </div>
      <div className="card bg-blue-grey">
        <p className="text-xl font-bold pb-4">Contact Support</p>
        <p>I wrestled a bear once. A 750lbs black bear.</p>
        <p className="pt-4 font-bold">What's this?</p>
      </div>
    </div>
  </div>
);

export default Home;
