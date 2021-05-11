// @ts-nocheck
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';

import Confirmation from 'views/Join/Confirmation';
import { ROUTES } from 'rt-constants';
import { startProgramDetails } from 'rt-store';

import LayoutV2 from 'components/Layouts/LayoutV2';
import ProgramAdminForm from 'components/JoinFormV2/ProgramAdminForm';
import NoProgramForm from 'components/JoinFormV2/NoProgramForm';

import LogoV2 from 'components/LogoV2';
import Button from 'components/Button';
import Segments from 'components/Segments';

import support from 'assets/images/auth/support.svg';
import successCircle from 'assets/images/auth/successCircle.svg';
import s1 from 'assets/images/backgrounds/s1.svg';
import s2 from 'assets/images/backgrounds/s2.svg';
import s3 from 'assets/images/backgrounds/s3.svg';

import './JoinV2.css';

const JoinV2 = () => {
  const [programDetails] = useAtom(startProgramDetails);
  const [joinProgram, setJoinProgram] = useState(true);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  return (
    <LayoutV2 hideHeader hideFooter authBackground>
      <div className="JoinV2">
        <Link to={ROUTES.LANDING_PAGE_V2.path} className="logoV2">
          <LogoV2 />
        </Link>
        {requestSubmitted ? (
          <div className="flex flex-col items-center md:-mx-20 md:px-36 md:pb-20 md:mt-12 relative">
            <img src={successCircle} alt="" className="mt-6" />
            <img src={s1} alt="" className="bgs bgs1" />
            <img src={s2} alt="" className="bgs bgs2" />
            <img src={s3} alt="" className="bgs bgs3" />
            <h2 className="mt-2">Request submitted</h2>
            <p className="mt-2 text-center">
              We will get in touch with you within&nbsp;48&nbsp;hours
            </p>
            <Link
              to={ROUTES.LANDING_PAGE_V2.path}
              className="no-underline mt-5"
            >
              <Button v2 outline>
                Go back to homepage
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="formContainer">
              {programDetails.firstName ? (
                <Confirmation />
              ) : (
                <>
                  <h2 className="mb-4">Join</h2>
                  <Segments
                    names={['Existing Program', 'Start a Program']}
                    current={joinProgram ? 0 : 1}
                    setCurrent={(value) => setJoinProgram(value === 0)}
                  />

                  {joinProgram ? (
                    <ProgramAdminForm
                      setRequestSubmitted={setRequestSubmitted}
                    />
                  ) : (
                    <NoProgramForm setRequestSubmitted={setRequestSubmitted} />
                  )}

                  <p className="mt-6">
                    Already have an account?{' '}
                    <Link to={ROUTES.LOG_IN_V2.path} className="underline">
                      Sign In
                    </Link>
                  </p>
                </>
              )}
            </div>
            <div className="contactSupport">
              <img src={support} alt="" />
              <span>If you have any questions</span>
              <a href="mailto:mack.heiser@datarobot.com?subject=rapidtestingapp.org%20Support%20Request">
                Contact support
              </a>
            </div>
          </>
        )}
      </div>
    </LayoutV2>
  );
};

export default JoinV2;
