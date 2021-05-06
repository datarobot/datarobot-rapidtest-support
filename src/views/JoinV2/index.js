// @ts-nocheck
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';

import Confirmation from 'views/Join/Confirmation';
import JoinFormV2 from 'components/JoinFormV2';
import { ROUTES } from 'rt-constants';
import { startProgramDetails } from 'rt-store';

import LayoutV2 from 'components/Layouts/LayoutV2';
import LogoV2 from 'components/LogoV2';
import Segments from 'components/Segments';

import support from 'assets/images/auth/support.svg';

import './JoinV2.css';

const JoinV2 = () => {
  const [programDetails] = useAtom(startProgramDetails);
  const [joinProgram, setJoinProgram] = useState(true);

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
              <h2 className="mb-4">Join</h2>
              <Segments
                names={['Existing Program', 'Start a Program']}
                current={joinProgram ? 0 : 1}
                setCurrent={(value) => setJoinProgram(value === 0)}
              />
              <section>
                <JoinFormV2 joinProgram={joinProgram} />
              </section>
              <p className="mt-4">
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
      </div>
    </LayoutV2>
  );
};

export default JoinV2;
