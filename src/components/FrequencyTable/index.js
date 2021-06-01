import React from 'react';

import low from 'assets/images/guide/low.svg';
import moderate from 'assets/images/guide/moderate.svg';
import substantial from 'assets/images/guide/substantial.svg';
import high from 'assets/images/guide/high.svg';
import check from 'assets/images/guide/check.svg';

import './FrequencyTable.css';

const FrequencyTable = () => {
  return (
    <div className="FrequencyTable">
      <div className="titles">
        <div>&nbsp;</div>
        <div>
          <h6>Diagnostic testing</h6>
          <p>
            Symptomatic students, teachers, staff and close contacts referred
            for diagnostic testing
          </p>
        </div>
        <div>
          <h6>Expanded screening testing for teachers and staff</h6>
        </div>
        <div>
          <h6>Expanded screening testing for students</h6>
        </div>
        <div>
          <h6>Testing for high-risk sports</h6>
          <p>For schools conducting routine testing for sports</p>
        </div>
        <div>
          <h6>Testing for low and intermediate-risk sports</h6>
          <p>For schools conducting routine testing for sports</p>
        </div>
      </div>
      <div className="data low">
        <div>
          <img src={low} alt="" />
          <h5>Low transmission</h5>
        </div>
        <div>
          <img src={check} alt="" className="mt-6" />
        </div>
        <div>At least once per week</div>
        <div>No</div>
        <div>At least once per week</div>
        <div>At least once per week</div>
      </div>
      <div className="data moderate">
        <div>
          <img src={moderate} alt="" />
          <h5>Moderate transmission</h5>
        </div>
        <div>
          <img src={check} alt="" className="mt-6" />
        </div>
        <div>At least once per week</div>
        <div>At least once per week</div>
        <div>At least once per week</div>
        <div>At least once per week</div>
      </div>
      <div className="data substantial">
        <div>
          <img src={substantial} alt="" />
          <h5>Substantial transmission</h5>
        </div>
        <div>
          <img src={check} alt="" className="mt-6" />
        </div>
        <div>At least once per week</div>
        <div>At least once per week</div>
        <div>Twice per week</div>
        <div>At least once per week</div>
      </div>
      <div className="data high">
        <div>
          <img src={high} alt="" />
          <h5>High transmission</h5>
        </div>
        <div>
          <img src={check} alt="" className="mt-6" />
        </div>
        <div>At least once per week</div>
        <div>At least once per week</div>
        <div>Twice per week</div>
        <div>At least once per week</div>
      </div>
    </div>
  );
};

export default FrequencyTable;
