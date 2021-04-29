import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'rt-constants';

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

import trainingMaterials from '../../assets/static/TrainingMaterials.pdf';

import './HomeV2.css';

const HomeV2 = () => {
  return (
    <div className="HomeV2 pb-8">
      <section className="flex items-center py-8">
        <div className="w-1/2 px-14">
          <div className="badge">Testing program at K-12 schools</div>
          <h1>Keep students and teachers safe</h1>
          <Button className="mt-4" v2 primary>
            <Link to={ROUTES.JOIN.path}>Join a Program</Link>
          </Button>
        </div>
        <div className="w-1/2">
          <img src={thumbsUp} alt="" className="mx-auto" />
        </div>
      </section>
      <section className="flex items-center p-8 highlighted rounded-xl">
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
        </div>
        <div className="w-1/2 px-14">
          <div className="badge">About RAPIDTEST</div>
          <h1 className="mb-4">Why it’s important</h1>
          <p>
            As the COVID-19 pandemic continues, finding ways to safely reopen
            schools for in-person learning is a pressing need. Schools provide a
            critical outlet for children through education, safety, nutrition,
            behavioral health care and important social interaction.
          </p>
        </div>
      </section>
      <section className="flex items-center py-8">
        <div className="w-1/2 px-14">
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
        <div className="w-1/2">
          <img src={playbook} alt="playbook" className="mx-auto" />
        </div>
      </section>
      <section className="py-8 w-full text-center">
        <div className="badge">ONSITE TESTING GUIDANCE</div>
        <h1 className="mb-4">How it works</h1>
        <p>
          Conducting rapid COVID-19 antigen tests at schools for assurance and
          symptom-induced testing is a cost effective, easy, and reliable way to
          ensure student and staff safety.
        </p>
      </section>
      <section className="flex justify-around py-8 howItWorks">
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
      </section>
      <section className="flex items-center p-14 inverted rounded-xl">
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
        <div className="w-1/2 px-14">
          <div className="badge">For Parents and Students</div>
          <h1 className="mb-4">If you are getting tested</h1>
          <p>
            Utilizing rapid COVID-19 antigen tests requires adherence to state
            and federal reporting regulations. These regulations instruct test
            administrators to report all test results to the relevant health
            authorities in a timely manner.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomeV2;
