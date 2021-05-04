import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'rt-constants';

import LayoutV2 from 'components/Layouts/LayoutV2';
import Button from 'components/Button';

import thumbsUp from 'assets/images/home/thumbs-up.png';

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
  <LayoutV2 landingBackground>
    <div className="HomeV2">
      <section className="testingProgram">
        <div className="testingProgramText">
          <div className="badge">Testing program at K-12 schools</div>
          <h1>Keep students and teachers safe</h1>
          <Button className="mt-4" v2 primary>
            <Link to={ROUTES.JOIN.path}>Join a Program</Link>
          </Button>
        </div>
        <div className="thumbsUp">
          <img src={thumbsUp} alt="" className="mx-auto" />
          <img src={el5} alt="" className="el5" />
        </div>
      </section>
      <section className="highlighted whyImportant">
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
            <p>Democratized testing to enable widespread use</p>
          </div>
          <div className="importantItem">
            <img src={quick} alt="quick" />
            <strong>Quick Testing</strong>
            <p>Testing and reporting is done in just 5 steps</p>
          </div>
          <div className="dummy">&nbsp;</div>
        </div>
        <div className="importantText">
          <div className="badge">About RAPIDTEST</div>
          <h1 className="mb-4">Why it’s important</h1>
          <p>
            As the COVID-19 pandemic continues, finding ways to safely reopen
            schools for in-person learning is a pressing need. Schools provide a
            critical outlet for children through education, safety, nutrition,
            behavioral health care and important social interaction.
          </p>
        </div>
        <img src={el4} alt="" className="el4" />
        <img src={el7} alt="" className="el7" />
      </section>
      <section className="trainingMaterials">
        <div className="trainingMaterialsText">
          <div className="badge">PLAYBOOK</div>
          <h1 className="mb-4">Training materials</h1>
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
      <section className="howItWorks">
        <div className="badge">ONSITE TESTING GUIDANCE</div>
        <h1 className="mb-4">How it works</h1>
        <p>
          Conducting rapid COVID-19 antigen tests at schools for assurance and
          symptom-induced testing is a cost effective, easy, and reliable way to
          ensure student and staff safety.
        </p>
      </section>
      <section className="howItWorksColumns">
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
        <div className="step">
          <h5 className="text-center">Station 1</h5>
          <hr />
          <div>
            <div className="subStep highlighted">
              <img src={patientScan} alt="" />
              <h5>Patient scan</h5>
              <p>Station 1 scans patient & test QR codes</p>
            </div>
          </div>
        </div>
        <div className="step">
          <h5 className="text-center">Station 2</h5>
          <hr />
          <div>
            <div className="subStep highlighted">
              <img src={antigenCheck} alt="" />
              <h5>Antigen check</h5>
              <p>Station 2 administers test</p>
              <p>&nbsp;</p>

              <img src={enterResult} alt="" />
              <h5>Enter result</h5>
              <p>Station 2 scans test QR code & enters result</p>
            </div>
          </div>
        </div>
        <div className="step">
          <h5 className="text-center">Save results</h5>
          <hr />
          <div>
            <div className="subStep highlighted">
              <img src={autoUpload} alt="" />
              <h5>Auto Upload</h5>
              <p>
                Results auto-upload to state systems for reporting & follow-up
              </p>
            </div>
          </div>
        </div>
        <div className="dummy">&nbsp;</div>
      </section>
      <section className="inverted forParents">
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
          <h1 className="mb-4">If you are getting tested</h1>
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
  </LayoutV2>
);

export default HomeV2;
