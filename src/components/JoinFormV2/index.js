// @ts-nocheck
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAtom } from 'jotai';

import { addAccount } from 'services/api';

import { startProgramDetails } from 'rt-store';

import {
  STATE_OPTIONS_FULL,
  NO_PROGRAMS_FULL,
  CURRENT_PROGRAMS_FULL,
} from 'rt-constants';

import InfoBox from 'components/InfoBox';
import Select from 'components/Select';

import ProgramAdminForm from 'components/JoinFormV2/ProgramAdminForm';
import NoProgramForm from 'components/JoinFormV2/NoProgramForm';

import './JoinFormV2.css';

const JoinFormV2 = ({ joinProgram }) => {
  const [, setStartProgramDetails] = useAtom(startProgramDetails);

  const [currentState, setCurrentState] = useState('');
  const [currentRole, setCurrentRole] = useState('');

  const getStateFullName = (val) =>
    STATE_OPTIONS_FULL.filter(({ value }) => val === value);

  const handleStateSelect = ({ value }) => {
    setCurrentState(getStateFullName(value)[0].label);
  };

  const handleSubmit = (data) => {
    addAccount(data)
      .then(() => {
        toast.success('Request submitted!');
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'analyticsEvent',
          eventAction: 'Signup Complete',
          eventCategory: 'Registration',
        });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleNoProgramSubmit = (data) => {
    setStartProgramDetails(data);
    toast.success(
      // eslint-disable-next-line quotes
      "Thanks for your interest! Unfortunately this feature hasn't been implemented yet."
    );
  };

  return joinProgram ? (
    <div>
      <p className="mt-4">
        The program is currently available only in Pennsylvania and Washington
      </p>
      <section>
        <div className="flex gap-4">
          <div className="w-1/2">
            <Select
              v2
              name="join-state-select"
              label="State"
              placeholder="Select your state"
              options={CURRENT_PROGRAMS_FULL}
              onChange={({ target }) => {
                handleStateSelect(target);
              }}
              value={currentState}
            />
          </div>
          <div className="w-1/2">
            <Select
              v2
              name="join-role-select"
              label="Role"
              placeholder="Select your role"
              options={[
                { value: 'TA', label: 'Test Admin' },
                { value: 'PA', label: 'Program Admin' },
              ]}
              onChange={({ target }) => {
                // handleRoleSelect(target);
              }}
              value={currentRole}
            />
          </div>
        </div>
      </section>
      <section>
        <ProgramAdminForm onSubmit={handleSubmit} />
      </section>
      {/* <section className="pt-0 h-full">
        <InfoBox
          v2
          className="mb-4"
          heading="Test admins"
          subtext="are responsible for conducting tests, but are not running training
        programs across multiple sites."
        />
        <InfoBox
          v2
          heading="Program admins"
          subtext="are responsible for signing up new users, and running training programs.
        They are managing the rollout across multiple schools."
        />
      </section> */}
    </div>
  ) : (
    <div>
      <p className="mt-4">Select your state to start a program </p>
      <section>
        <div className="flex">
          <div className="w-full">
            <Select
              v2
              name="join-state-select"
              label="State"
              placeholder="Select your state"
              options={NO_PROGRAMS_FULL}
              onChange={({ target }) => {
                handleStateSelect(target);
              }}
              value={currentState}
            />
          </div>
        </div>
      </section>
      <section>
        <NoProgramForm onSubmit={handleNoProgramSubmit} />
      </section>
      {/* <section className="pt-0 h-full">
        <InfoBox
          v2
          className="mb-4"
          heading="CLIA waivers"
          subtext="CLIA waivers are issued in varying capacities depending on each state’s policy. A CLIA waiver allows the operating school to conduct and report tests in compliance with state and federal policy. CLIA waivers are not frequently owned by schools or other non-health organizations, so there can be some complications in obtaining these waivers. It’s recommended that there’s a scalable plan for providing CLIA waivers to all schools or organizations who will be participating in the program, for more information on obtaining CLIA waivers, click here."
        />
      </section> */}
    </div>
  );
};
export default JoinFormV2;
