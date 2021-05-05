// @ts-nocheck
import { useState } from 'react';
import { Link } from 'react-router-dom';
import cls from 'classnames';
import { Element, scroller } from 'react-scroll';
import { useAtom } from 'jotai';

import Confirmation from 'views/Join/Confirmation';
import Select from 'components/Select';
import JoinForm from 'components/JoinForm';
import { STATE_OPTIONS_FULL, CURRENT_PROGRAMS, ROUTES } from 'rt-constants';
import { startProgramDetails } from 'rt-store';

import LayoutV2 from 'components/Layouts/LayoutV2';
import LogoV2 from 'components/LogoV2';

import './JoinV2.css';

const Join = () => {
  const [currentState, setCurrentState] = useState('');
  const [currentStateName, setCurrentStateName] = useState('');
  const [hasProgram, setHasProgram] = useState();
  const [programDetails] = useAtom(startProgramDetails);

  const getStateFullName = (val) =>
    STATE_OPTIONS_FULL.filter(({ value }) => val === value);

  const scrollToForm = () => {
    scroller.scrollTo('join-form', {
      duration: 500,
      delay: 100,
      smooth: true,
      offset: -80,
    });
  };

  const handleStateSelect = ({ value }) => {
    setCurrentState(value);
    setCurrentStateName(getStateFullName(value)[0].label);
    setHasProgram(CURRENT_PROGRAMS.includes(value));
    scrollToForm();
  };

  return (
    <LayoutV2 hideHeader hideFooter authBackground>
      <div className="JoinV2">
        <Link to={ROUTES.LANDING_PAGE_V2.path} className="logoV2">
          <LogoV2 />
        </Link>
        <div className="formContainer">
          {programDetails.firstName ? (
            <Confirmation />
          ) : (
            <>
              <h2>Join</h2>
              <p className="mb-6">
                Reopen your schools. Rollout a COVID-19 testing program using
                RapidTest and send reports to government regulated relevant
                health authorities.
              </p>
              <section>
                <p className="sub-heading text-blue">What state are you in?</p>

                <div className="flex mt-4">
                  <div className="w-1/2 mr-8">
                    <Select
                      name="join-state-select"
                      placeholder="Select your state"
                      options={STATE_OPTIONS_FULL}
                      onChange={({ target }) => {
                        handleStateSelect(target);
                      }}
                      value={currentState}
                    />
                  </div>
                  <p
                    className={cls('w-1/2 flex items-center', {
                      'text-blue-light': hasProgram && currentState,
                      'text-yellow': !hasProgram && currentState,
                    })}
                  >
                    {!hasProgram &&
                      currentState &&
                      `There is no existing program in ${currentStateName}`}
                    {hasProgram &&
                      currentState &&
                      `There is an existing program in ${currentStateName}`}
                    {!currentState &&
                      'Check if there is a program in your state.'}
                  </p>
                </div>
              </section>
              <Element name="join-form">
                <section className="mt-6">
                  {currentState && (
                    <JoinForm
                      v2
                      currentState={currentStateName}
                      hasProgram={hasProgram}
                    />
                  )}
                </section>
              </Element>
            </>
          )}
        </div>
      </div>
    </LayoutV2>
  );
};

export default Join;
