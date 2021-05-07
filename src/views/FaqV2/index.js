// @ts-nocheck
import React, { useState } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

import { ROUTES } from 'rt-constants';

import StaticContainerV2 from 'components/StaticContainerV2';
import Segments from 'components/Segments';

import './FaqV2.css';
import support from '../../assets/images/auth/support.svg';
import Button from '../../components/Button';

const pathToIndex = {
  [ROUTES.FAQ_V2.GENERAL.path]: 0,
  [ROUTES.FAQ_V2.PROGRAM.path]: 1,
  [ROUTES.FAQ_V2.TEST.path]: 2,
};

const FaqV2 = () => {
  const { pathname } = useLocation();
  const [currentTab, setCurrentTab] = useState(pathToIndex[pathname] || 0);

  return (
    <section className="FaqV2">
      <h2>Frequently Asked Questions</h2>
      <Segments
        className="segments"
        names={['General', 'Program Admin', 'Test Operator']}
        links={[
          ROUTES.FAQ_V2.GENERAL.path,
          ROUTES.FAQ_V2.PROGRAM.path,
          ROUTES.FAQ_V2.TEST.path,
        ]}
        current={currentTab}
        setCurrent={(value) => setCurrentTab(value)}
      />
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
