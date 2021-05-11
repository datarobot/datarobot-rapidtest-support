// @ts-nocheck
import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';

import { ROUTES } from 'rt-constants';
import { useResponsive } from 'hooks';

import StaticContainerV2 from 'components/StaticContainerV2';
import Segments from 'components/Segments';
import Button from 'components/Button';
import Select from 'components/Select';

import support from 'assets/images/auth/support.svg';

import './FaqV2.css';

const paths = [
  ROUTES.FAQ_V2.GENERAL.path,
  ROUTES.FAQ_V2.PROGRAM.path,
  ROUTES.FAQ_V2.TEST.path,
];

const pathToIndex = {
  [ROUTES.FAQ_V2.GENERAL.path]: 0,
  [ROUTES.FAQ_V2.PROGRAM.path]: 1,
  [ROUTES.FAQ_V2.TEST.path]: 2,
};

const options = [
  { value: 0, label: 'General' },
  { value: 1, label: 'Program Admin' },
  { value: 2, label: 'Test Operator' },
];

const FaqV2 = () => {
  const { isMobile } = useResponsive();
  const { push } = useHistory();
  const { pathname } = useLocation();
  const [currentTab, setCurrentTab] = useState(pathToIndex[pathname] || 0);

  useEffect(() => {
    push(paths[currentTab]);
  }, [currentTab]);
  return (
    <section className="FaqV2">
      <h2>Frequently Asked Questions</h2>

      {isMobile ? (
        <Select
          v2
          options={options}
          onChange={({ target: { value } }) =>
            setCurrentTab(parseInt(value, 10))
          }
          value={currentTab}
        />
      ) : (
        <Segments
          className="segments"
          names={['General', 'Program Admin', 'Test Operator']}
          current={currentTab}
          setCurrent={(value) => setCurrentTab(value)}
        />
      )}

      <section className="faq-content">
        <Switch>
          <Route exact path={ROUTES.FAQ_V2.path}>
            <Redirect to={ROUTES.FAQ_V2.GENERAL.path} />
          </Route>
          <Route path={ROUTES.FAQ_V2.ALL.path}>
            <StaticContainerV2 headline="FAQ" />
          </Route>
        </Switch>
      </section>
      <div className="contactSupport">
        <img src={support} alt="" />
        <div className="flex-grow">
          <div className="badge">Can't find an answer</div>
          <h2 className="mt-2">Contact support</h2>
        </div>

        <a
          href="mailto:mack.heiser@datarobot.com?subject=rapidtestingapp.org%20Support%20Request"
          className="no-underline"
        >
          <Button v2 transparent>
            Contact
          </Button>
        </a>
      </div>
    </section>
  );
};

export default FaqV2;
