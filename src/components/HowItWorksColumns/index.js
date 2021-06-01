import React from 'react';
import cls from 'classnames';

import onSite from 'assets/images/home/on-site.svg';
import atHome from 'assets/images/home/at-home.svg';
import print from 'assets/images/home/print.svg';
import save from 'assets/images/home/save.svg';
import patientScan from 'assets/images/home/patient-scan.svg';
import antigenCheck from 'assets/images/home/antigen-check.svg';
import enterResult from 'assets/images/home/enter-result.svg';
import autoUpload from 'assets/images/home/auto-upload.svg';

import './HowItWorksColumns.css';

const HowItWorksColumns = ({ className }) => {
  return (
    <section className={cls('HowItWorksColumns', className)}>
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
                Results auto-upload to state systems for reporting &amp;
                follow-up
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="dummy">&nbsp;</div>
    </section>
  );
};

export default HowItWorksColumns;
