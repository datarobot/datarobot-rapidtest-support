import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'rt-constants';

import LayoutV2 from 'components/Layouts/LayoutV2';
import Button from 'components/Button';

import people from 'assets/images/home/people.png';

import safe from 'assets/images/home/safe.svg';
import reliable from 'assets/images/home/reliable.svg';
import scalable from 'assets/images/home/scalable.svg';
import quick from 'assets/images/home/quick.svg';

import playbook from 'assets/images/home/playbook.svg';

import onSite from 'assets/images/home/on-site.svg';
import atHome from 'assets/images/home/at-home.svg';
import print from 'assets/images/home/print.svg';
import save from 'assets/images/home/save.svg';
import patientScan from 'assets/images/home/patient-scan.svg';
import antigenCheck from 'assets/images/home/antigen-check.svg';
import enterResult from 'assets/images/home/enter-result.svg';
import autoUpload from 'assets/images/home/auto-upload.svg';

import arrowRight from 'assets/images/home/arrow-right.svg';

import el4 from 'assets/images/home/el4.svg';
import el5 from 'assets/images/home/el5.svg';
import el7 from 'assets/images/home/el7.svg';
import el11 from 'assets/images/home/el11.svg';
import el12 from 'assets/images/home/el12.svg';
import el13 from 'assets/images/home/el13.svg';

import trainingMaterials from 'assets/static/TrainingMaterials.pdf';

import './HomeV2.css';

const HomeV2 = () => (
  <LayoutV2 landingBackground wide>
    <div className="HomeV2">
      <section className="limitWidth testingProgram">
        <div className="testingProgramText">
          <div className="badge">Testing program at K-12 schools</div>
          <h1 className="my-4">Keep students and&nbsp;teachers safe</h1>
          <Button className="mt-4" v2 primary>
            <Link to={ROUTES.JOIN_V2.path}>Join a Program</Link>
          </Button>
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
          <Button className="mt-4" v2 primary>
            <a
              href={trainingMaterials}
              target="_blank"
              rel="noopener noreferrer"
            >
              View guide
            </a>
          </Button>
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
          symptom-induced testing is a cost effective, easy, and reliable way to
          ensure student and staff safety.
        </p>
      </section>
      <section className="limitWidth howItWorksColumns">
        <div className="step">
          <h5 className="text-center">Pre-register</h5>
          <hr />
          <div>
            <div className="subStep highlighted">
              <img src={onSite} alt="" />
              <h5>On-site</h5>
              <p>Complete form on school computer</p>
            </div>
            <div className="subStep highlighted">
              <img src={atHome} alt="" />
              <h5>At home</h5>
              <p>Complete form on phone or computer</p>
            </div>
          </div>
        </div>
        <div className="divider">
          <svg
            width="90"
            height="270"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 1L90 1"
              stroke="#5B5FF0"
              strokeWidth="2"
              strokeDasharray="4 6"
              className="path"
            />
            <path
              d="M1 269H90"
              stroke="#5B5FF0"
              strokeWidth="2"
              strokeDasharray="4 6"
              className="path"
            />
          </svg>
        </div>
        <div className="dividerPhone first">
          <svg
            width="186"
            height="112"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M185 0V112" stroke="#5B5FF0" className="path" />
            <path d="M1 0L1 112" stroke="#5B5FF0" className="path" />
          </svg>
        </div>
        <div className="step">
          <h5 className="text-center">Get QR code</h5>
          <hr />
          <div>
            <div className="subStep highlighted">
              <img src={print} alt="" />
              <h5>Print</h5>
              <p>Print QR code on school printer</p>
            </div>
            <div className="subStep highlighted">
              <img src={save} alt="" />
              <h5>Save</h5>
              <p>Print, e-mail, or screenshot QR code</p>
            </div>
          </div>
        </div>
        <div className="divider">
          <svg
            width="90"
            height="267"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 1H48.5761C55.2036 1 60.5761 6.37258 60.5761 13V103C60.5761 109.627 65.9487 115 72.5761 115H90"
              stroke="#5B5FF0"
              className="path"
            />
            <path
              d="M0 266H48.5761C55.2036 266 60.5761 260.627 60.5761 254V164C60.5761 157.373 65.9487 152 72.5761 152H90"
              stroke="#5B5FF0"
              className="path"
            />
          </svg>
        </div>
        <div className="dividerPhone">
          <svg
            width="186"
            height="48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M105 48V29C105 22 110 17 117 17L173 17C180 17 185 12 185 5V0"
              stroke="#5B5FF0"
              className="pathReverse"
            />
            <path
              d="M81 47V28C81 21 76 16 69 16L13 16C6 16 1 11 1 4V0"
              stroke="#5B5FF0"
              className="pathReverse"
            />
          </svg>
        </div>
        <div className="step">
          <h5 className="text-center">Station 1</h5>
          <hr />
          <div>
            <div className="subStep wide highlighted">
              <img src={patientScan} alt="" />
              <div>
                <h5>Patient scan</h5>
                <p>Station 1 scans patient & test QR codes</p>
              </div>
            </div>
          </div>
        </div>
        <div className="divider">
          <svg
            width="90"
            height="2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 1L90 1" stroke="#5B5FF0" className="path" />
          </svg>
        </div>
        <div className="dividerPhone">
          <svg
            width="2"
            height="48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 0L1 48" stroke="#5B5FF0" className="path" />
          </svg>
        </div>
        <div className="step">
          <h5 className="text-center">Station 2</h5>
          <hr />
          <div>
            <div className="subStep highlighted">
              <div className="wide">
                <img src={antigenCheck} alt="" />
                <div>
                  <h5>Antigen check</h5>
                  <p>Station 2 administers test</p>
                  <p>&nbsp;</p>
                </div>
              </div>
              <div className="wide">
                <img src={enterResult} alt="" />
                <div>
                  <h5>Enter result</h5>
                  <p>Station 2 scans test QR code & enters result</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="divider">
          <svg
            width="90"
            height="2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 1L90 1" stroke="#5B5FF0" className="path" />
          </svg>
        </div>
        <div className="dividerPhone">
          <svg
            width="2"
            height="48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 0L1 48" stroke="#5B5FF0" className="path" />
          </svg>
        </div>
        <div className="step">
          <h5 className="text-center">Save results</h5>
          <hr />
          <div>
            <div className="subStep wide highlighted">
              <img src={autoUpload} alt="" />
              <div>
                <h5>Auto Upload</h5>
                <p>
                  Results auto-upload to state systems for reporting & follow-up
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="dummy">&nbsp;</div>
      </section>
      <div className="wrapper inverted">
        <section className="limitWidth forParents">
          <div className="forParentsItems">
            <div className="forParentsItem">
              <h5>CDC guidance for school and childcare programs</h5>
              <div className="arrow">
                <img src={arrowRight} alt="" />
              </div>
            </div>
            <div className="forParentsItem">
              <h5>COVID testing guidance</h5>
              <div className="arrow">
                <img src={arrowRight} alt="" />
              </div>
            </div>
            <div className="forParentsItem">
              <h5>Children, teens, young adults (CDC)</h5>
              <div className="arrow">
                <img src={arrowRight} alt="" />
              </div>
            </div>
            <div className="forParentsItem">
              <h5>Screen for COVID among school population</h5>
              <div className="arrow">
                <img src={arrowRight} alt="" />
              </div>
            </div>
          </div>
          <div className="forParentsText">
            <div className="badge">For Parents and Students</div>
            <h2>If you are getting tested</h2>
            <p>
              Utilizing rapid COVID-19 antigen tests requires adherence to state
              and federal reporting regulations. These regulations instruct test
              administrators to report all test results to the relevant health
              authorities in a timely manner.
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

export default HomeV2;
