import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LANDING_PAGE_LINKS, ROUTES, STATE_TO_NAME } from 'rt-constants';
import { get } from 'utils';

import { AuthContext } from 'components/AuthProvider';
import LayoutV2 from 'components/Layouts/LayoutV2';
import Button from 'components/Button';
import HowItWorksColumns from 'components/HowItWorksColumns';

import people from 'assets/images/home/people.png';

import safe from 'assets/images/home/safe.svg';
import reliable from 'assets/images/home/reliable.svg';
import scalable from 'assets/images/home/scalable.svg';
import quick from 'assets/images/home/quick.svg';

import playbook from 'assets/images/home/playbook.svg';

import arrowRight from 'assets/images/home/arrow-right.svg';

import el4 from 'assets/images/home/el4.svg';
import el5 from 'assets/images/home/el5.svg';
import el7 from 'assets/images/home/el7.svg';
import el11 from 'assets/images/home/el11.svg';
import el12 from 'assets/images/home/el12.svg';
import el13 from 'assets/images/home/el13.svg';

import trainingMaterials from 'assets/static/TrainingMaterials.pdf';

import './HomeV2.css';

const { GETTING_TESTED } = LANDING_PAGE_LINKS;

const HomeV2 = () => {
  const { authenticated } = useContext(AuthContext);
  const currentState = STATE_TO_NAME[get('program')];

  return (
    <LayoutV2 backgroundLanding wide>
      <div className="HomeV2">
        <section className="limitWidth testingProgram">
          <div className="testingProgramText">
            <div className="badge">Testing program at K-12 schools</div>
            <h1 className="my-4">
              Keep students and&nbsp;teachers safe
              {authenticated && currentState ? ` in ${currentState}` : null}
            </h1>
            <Link to={ROUTES.JOIN_V2.path} className="no-underline">
              <Button className="mt-4" v2 primary>
                Join a Program
              </Button>
            </Link>
          </div>
          <div className="people">
            <img src={people} alt="" className="mx-auto" />
            <img src={el5} alt="" className="el5" />
          </div>
        </section>
        <div className="wrapper highlighted">
          <section className="limitWidth whyImportant">
            <div className="importantItems">
              <div className="importantItem">
                <img src={safe} alt="safe" />
                <strong>Safe</strong>
                <p>Get and keep kids back in school safely</p>
              </div>
              <div className="importantItem">
                <img src={reliable} alt="reliable" />
                <strong>Reliable</strong>
                <p>Stop an outbreak before it starts</p>
              </div>
              <div className="importantItem">
                <img src={scalable} alt="scalable" />
                <strong>Scalable</strong>
                <p>Democratized approach to enable widespread use</p>
              </div>
              <div className="importantItem">
                <img src={quick} alt="quick" />
                <strong>Quick Testing</strong>
                <p>Testing and reporting is done in just 5 steps</p>
              </div>
              <div className="dummy">&nbsp;</div>
            </div>
            <div className="importantSplit" />
            <div className="importantText">
              <div>
                <div className="badge">About RAPIDTEST</div>
                <h2>Why it’s important</h2>
                <p>
                  As the COVID-19 pandemic continues, finding ways to safely
                  reopen schools for in-person learning is a pressing need.
                  Schools provide a critical outlet for children through
                  education, safety, nutrition, behavioral health care and
                  important social interaction.
                </p>
              </div>
            </div>
            <img src={el4} alt="" className="el4" />
            <img src={el7} alt="" className="el7" />
          </section>
        </div>
        <section className="limitWidth trainingMaterials">
          <div className="trainingMaterialsText">
            <div className="badge">PLAYBOOK</div>
            <h2>Training materials</h2>
            <p>
              The information found in the training materials will outline the
              steps required to successfully develop an application-supported
              testing program at K-12 schools that keeps teachers and children
              safe.
            </p>
            <a
              href={trainingMaterials}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
            >
              <Button className="mt-4" v2 primary>
                View guide
              </Button>
            </a>
          </div>
          <div className="trainingMaterialsPicture">
            <img src={playbook} alt="playbook" className="mx-auto" />
          </div>
        </section>
        <section className="limitWidth howItWorks">
          <div className="badge">ONSITE TESTING GUIDANCE</div>
          <h2>How it works</h2>
          <p>
            Conducting rapid COVID-19 antigen tests at schools for assurance and
            symptom-induced testing is a cost effective, easy, and reliable way
            to ensure student and staff safety.
          </p>
        </section>
        <HowItWorksColumns className="limitWidth" />
        <div className="wrapper inverted">
          <section className="limitWidth forParents">
            <div className="forParentsTiles">
              {GETTING_TESTED.map(({ text, url }) => (
                <a
                  key={text}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="forParentsTile"
                >
                  <h5>{text}</h5>
                  <div className="arrow">
                    <img src={arrowRight} alt="" />
                  </div>
                </a>
              ))}
            </div>
            <div className="forParentsText">
              <div className="badge">For Parents and Students</div>
              <h2>If you are getting tested</h2>
              <p>
                Utilizing rapid COVID-19 antigen tests requires adherence to
                state and federal reporting regulations. These regulations
                instruct test administrators to report all test results to the
                relevant health authorities in a timely manner.
              </p>
            </div>
            <img src={el11} alt="" className="el11" />
            <img src={el12} alt="" className="el12" />
            <img src={el13} alt="" className="el13" />
          </section>
        </div>
      </div>
    </LayoutV2>
  );
};

export default HomeV2;
