import React, { useRef, useState } from 'react';
import cls from 'classnames';

import { useResponsive } from 'hooks';

import low from 'assets/images/guide/low.svg';
import moderate from 'assets/images/guide/moderate.svg';
import substantial from 'assets/images/guide/substantial.svg';
import high from 'assets/images/guide/high.svg';
import check from 'assets/images/guide/check.svg';

import './FrequencyTable.css';

const FrequencyTable = () => {
  const [currentColumn, setCurrentColumn] = useState('low');
  const { isMobile } = useResponsive();
  const columnNamesRef = useRef();

  return (
    <div className="FrequencyTable">
      <div className="columnNames" ref={columnNamesRef}>
        <div
          className={cls({ active: currentColumn === 'low' })}
          onClick={() => {
            setCurrentColumn('low');
            columnNamesRef.current.scrollTo(0 * 196, 0);
          }}
        >
          <div className="low">
            <img src={low} alt="" />
            <h5>Low transmission</h5>
          </div>
        </div>
        <div
          className={cls({ active: currentColumn === 'moderate' })}
          onClick={() => {
            setCurrentColumn('moderate');
            columnNamesRef.current.scrollTo(1 * 196, 0);
          }}
        >
          <div className="moderate">
            <img src={moderate} alt="" />
            <h5>Moderate transmission</h5>
          </div>
        </div>
        <div
          className={cls({
            active: currentColumn === 'substantial',
          })}
          onClick={() => {
            setCurrentColumn('substantial');
            columnNamesRef.current.scrollTo(2 * 196, 0);
          }}
        >
          <div className="substantial">
            <img src={substantial} alt="" />
            <h5>Substantial transmission</h5>
          </div>
        </div>
        <div
          className={cls({ active: currentColumn === 'high' })}
          onClick={() => {
            setCurrentColumn('high');
            columnNamesRef.current.scrollTo(3 * 196, 0);
          }}
        >
          <div className="high">
            <img src={high} alt="" />
            <h5>High transmission</h5>
          </div>
        </div>
        <div className="dummy">&nbsp;</div>
      </div>
      <div className="columns">
        <div className="titles">
          <div className="head">&nbsp;</div>
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
        <div
          className={cls('data low', {
            hidden: isMobile && currentColumn !== 'low',
          })}
        >
          <div className="head">
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
        <div
          className={cls('data moderate', {
            hidden: isMobile && currentColumn !== 'moderate',
          })}
        >
          <div className="head">
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
        <div
          className={cls('data substantial', {
            hidden: isMobile && currentColumn !== 'substantial',
          })}
        >
          <div className="head">
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
        <div
          className={cls('data high', {
            hidden: isMobile && currentColumn !== 'high',
          })}
        >
          <div className="head">
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
    </div>
  );
};

export default FrequencyTable;
