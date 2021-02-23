// @ts-nocheck
import { useState } from 'react';
import cls from 'classnames';
import Select from 'components/Select';
import JoinForm from 'components/JoinForm';
import { STATE_OPTIONS_FULL } from 'rt-constants';

import './Join.css';

const Join = () => {
  const [currentState, setCurrentState] = useState('');
  const [currentStateName, setCurrentStateName] = useState('');

  const getStateFullName = (val) =>
    STATE_OPTIONS_FULL.filter(({ value }) => val === value);

  return (
    <>
      <section className="my-12">
        <h1 className="headline text-blue mb-6">Join RapidTest</h1>
        <p className="w-7/12 mb-6">
          Reopen your schools. Rollout a COVID-19 testing program using
          RepidTest and send reports to government regulated relevant health
          authorities.
        </p>
      </section>
      <section>
        <p className="sub-heading text-blue">What state are you in?</p>

        <div className="flex mt-8">
          <div className="w-1/2 mr-8">
            <Select
              name="join-state-select"
              placeholder="Select your state"
              options={STATE_OPTIONS_FULL}
              onChange={({ target }) => {
                setCurrentState(target.value);
                setCurrentStateName(getStateFullName(target.value)[0].label);
              }}
              value={currentState}
            />
          </div>
          <p
            className={cls('w-1/2 flex items-center', {
              'text-light-blue': currentState,
            })}
          >
            {currentState
              ? 'There is an existing program'
              : 'Check if there is a program in your state.'}
          </p>
        </div>
      </section>
      <section className="mt-24 mb-12">
        {currentState && <JoinForm currentState={currentStateName} />}
      </section>
    </>
  );
};

export default Join;
