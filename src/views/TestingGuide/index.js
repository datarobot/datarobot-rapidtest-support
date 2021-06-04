import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
  generatePath,
  Link,
} from 'react-router-dom';

import { ROUTES } from 'rt-constants';
import { useResponsive } from 'hooks';

import LayoutV2 from 'components/Layouts/LayoutV2';
import Segments from 'components/Segments';
import Button from 'components/Button';
import HowItWorksColumns from 'components/HowItWorksColumns';
import FrequencyTable from 'components/FrequencyTable';

import people from 'assets/images/guide/people.png';
import supplyExchange from 'assets/images/guide/supply-exchange.svg';
import regulations from 'assets/images/guide/regulations.svg';
import consent from 'assets/images/guide/consent.svg';
import staff from 'assets/images/guide/staff.svg';
import supplyBg from 'assets/images/guide/supply-bg.svg';
import station1 from 'assets/images/guide/station1.jpg';
import station2 from 'assets/images/guide/station2.jpg';
import station3 from 'assets/images/guide/station3.jpg';

import trainingMaterials from 'assets/static/TrainingMaterials.pdf';
import parentConsent from 'assets/static/Assurance Testing - Parent Consent.pdf';

import './TestingGuide.css';

const paths = [
  generatePath(ROUTES.TESTING_GUIDE.path, { id: 'getting-started' }),
  generatePath(ROUTES.TESTING_GUIDE.path, { id: 'testing-stations' }),
];

const pathToIndex = {
  [generatePath(ROUTES.TESTING_GUIDE.path, { id: 'getting-started' })]: 0,
  [generatePath(ROUTES.TESTING_GUIDE.path, { id: 'testing-stations' })]: 1,
};

const TestingGuide = () => {
  const { isMobile } = useResponsive();
  const names = isMobile
    ? ['Getting Started', 'Testing Stations']
    : ['Getting Started', 'Setting Up Testing Stations'];

  const { push } = useHistory();
  const { pathname } = useLocation();
  const [currentTab, setCurrentTab] = useState(pathToIndex[pathname] || 0);

  useEffect(() => {
    push(paths[currentTab]);
  }, [currentTab]);

  return (
    <LayoutV2 backgroundLanding wide>
      <div className="TestingGuide">
        <section className="heading">
          <h2>Testing Guide</h2>

          <Segments
            className="segments"
            names={names}
            current={currentTab}
            setCurrent={(value) => setCurrentTab(value)}
          />
        </section>

        <Switch>
          <Route exact path={ROUTES.TESTING_GUIDE_LANDING.path}>
            <Redirect
              to={generatePath(ROUTES.TESTING_GUIDE.path, {
                id: 'getting-started',
              })}
            />
          </Route>
          <Route
            path={generatePath(ROUTES.TESTING_GUIDE.path, {
              id: 'getting-started',
            })}
          >
            <section className="limitWidth inPersonLearning">
              <div className="text">
                <div className="badge">Program Overview</div>
                <h2>In-person Learning is a Pressing Need</h2>
                <p>
                  Schools provide a critical outlet for children through
                  education, safety, nutrition, behavioral health care, and
                  social interaction. Although incredible efforts have been made
                  to transition to virtual learning, in-person instruction
                  remains essential for children, their families, and
                  communities. As the COVID-19 pandemic continues, finding ways
                  to safely reopen schools for in-person learning is a pressing
                  need.
                </p>

                <a
                  href={trainingMaterials}
                  className="no-underline mt-8 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button v2 primary>
                    View training materials
                  </Button>
                </a>
              </div>
              <div className="people">
                <img src={people} alt="" className="mx-auto" />
              </div>
            </section>
            <div className="wrapper highlighted">
              <section className="limitWidth costEffective">
                <div className="flex justify-center items-center">
                  <img src={regulations} alt="" />
                </div>
                <div>
                  <div>
                    <div className="badge">Program Overview</div>
                    <h2>
                      Сost-effective, Easy, and Reliable Way to Ensure Staff and
                      Student Safety
                    </h2>
                    <p>
                      Utilizing{' '}
                      <a
                        href="https://www.cdc.gov/mmwr/volumes/69/wr/mm695152a3.htm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        rapid COVID-19 antigen tests
                      </a>{' '}
                      requires adherence to state and federal reporting
                      regulations instructing test administrators to report all
                      test results to the relevant health authorities in a
                      timely manner. Schools are encouraged to use technologies
                      that ease administrative burdens and comply with reporting
                      requirements. The information found in this guide includes
                      the steps required to successfully develop an
                      application-supported testing program at K-12 schools that
                      keeps teachers and children safe.
                    </p>
                  </div>
                </div>
              </section>
            </div>
            <section className="limitWidth cliaWaivers">
              <div>
                <h2>CLIA Waivers</h2>
                <p>
                  It is required that all schools doing reporting do so under a
                  certified CLIA. In many states, the public health departments
                  will extend their CLIA coverage to participating schools in
                  their district. Clinical Laboratory Amendment Improvements is
                  a certificate which requires all facilities that perform
                  applicable tests, even waived, on “materials derived from the
                  human body for the purpose of providing information for the
                  diagnosis, prevention, or treatment of any disease or
                  impairment of, or assessment of the health of, human beings”
                  to meet certain Federal requirements.
                </p>
              </div>
              <div className="list">
                <div>
                  <div className="badge">How do I get one?</div>
                  <ol>
                    <li>
                      Fill out{' '}
                      <a
                        href="https://www.cms.gov/Medicare/CMS-Forms/CMS-Forms/downloads/cms116.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        CMS-116
                      </a>{' '}
                      (Standard Form)
                    </li>
                    <li>
                      Check if your State needs additional information (Will
                      vary by State)
                    </li>
                    <li>Submit to State Agency (Will vary by State)</li>
                    <li>Receive “Fee Coupon”</li>
                    <li>Pay Fee</li>
                    <li>Receive Certificate</li>
                    <li>Maintain Certificate</li>
                  </ol>
                </div>
              </div>
            </section>
            <div className="wrapper inverted">
              <section className="limitWidth acquiringTests">
                <div>
                  <h2>Acquiring Tests</h2>
                  <p>
                    Tests can be procured from your state health department, If
                    there are shortages, you can automatically request tests
                    from the COVID-19 Supply Exchange. Both antigen and PCR
                    tests can be used in a school testing program.
                  </p>
                </div>
                <div className="supplyExchange">
                  <img src={supplyExchange} alt="" className="mx-auto" />
                  <a
                    className="mt-6 inline-block"
                    href="https://supplyexchange.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button v2 primary>
                      Visit Supply Exchange
                    </Button>
                  </a>
                </div>
                <img src={supplyBg} alt="" className="supplyBg" />
              </section>
            </div>
            <section className="limitWidth obtainingConsent">
              <div className="flex items-center justify-center">
                <img src={consent} alt="" />
              </div>
              <div>
                <div className="badge">Documents</div>
                <h2>Obtaining Consent</h2>
                <p>
                  Schools handle consent on their own, here’s an example of a
                  paper consent form
                </p>
                <a
                  href={parentConsent}
                  className="no-underline inline-block mt-6"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button v2 outline>
                    View Example
                  </Button>
                </a>
              </div>
            </section>
            <div className="wrapper highlighted">
              <section className="limitWidth determiningFrequency">
                <div className="frequencyHeading">
                  <div>
                    <h2>Determining Testing&nbsp;Frequency</h2>
                  </div>
                  <div>
                    Testing frequency is contingent on factors such as community
                    risk levels. The CDC recommends teachers and staff
                    participate in routine screening testing at least once per
                    week. In areas with substantial and high community
                    transmission, twice a week screening testing might be
                    preferable to quickly detect cases among teachers and staff.
                  </div>
                </div>
                <FrequencyTable />
              </section>
            </div>
          </Route>
          <Route
            path={generatePath(ROUTES.TESTING_GUIDE.path, {
              id: 'testing-stations',
            })}
          >
            <section className="limitWidth settingUp">
              <div>
                <h3>Setting Up Testing Stations</h3>
                <p>
                  The most common practice is to deploy a two-station approach.
                  Station 1 checks in patients while station 2 administers the
                  test and uploads the result.
                </p>
              </div>
            </section>
            <HowItWorksColumns className="limitWidth" />
            <section className="limitWidth example">
              <h3>Example</h3>
              <div className="three">
                <div>
                  <img src={station1} alt="" />
                  <div>
                    <h5>Students check in</h5>
                    <ol>
                      <li>
                        The users scan a new test and the patient’s QR code.
                      </li>
                      <li>
                        The user writes the patient’s name on the BinaxNow test.
                      </li>
                    </ol>
                  </div>
                </div>
                <div>
                  <img src={station2} alt="" />
                  <div>
                    <h5>The test is administered</h5>
                    <ol>
                      <li>
                        The user writes the patient time on the BinaxNow card
                      </li>
                    </ol>
                  </div>
                </div>
                <div>
                  <img src={station3} alt="" />
                  <div>
                    <h5>Tests are placed on a table</h5>
                    <ol>
                      <li>Tests ‘bake’.</li>
                      <li>Free users will upload tests as they complete.</li>
                    </ol>
                  </div>
                </div>
              </div>
            </section>
            <section className="limitWidth staffing">
              <div>
                <img src={staff} alt="" className="mx-auto" />
              </div>
              <div>
                <div className="badge">Stations</div>
                <h2>Staffing Testing Stations</h2>
                <p>
                  It's best practice to have 2-3 people to run testing. Once
                  working efficiently, this system can process two patients per
                  minute.
                </p>
              </div>
            </section>
          </Route>
        </Switch>
      </div>
    </LayoutV2>
  );
};

export default TestingGuide;
