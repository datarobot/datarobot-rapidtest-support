// @ts-nocheck
import cls from 'classnames';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAtom } from 'jotai';
import * as Scroll from 'react-scroll';

import InfoBox from 'components/InfoBox';
import Tabs from 'components/Tabs';

import ProgramAdminForm from 'components/JoinForm/ProgramAdminForm';
import TestAdminForm from 'components/JoinForm/TestAdminForm';
import NoProgramForm from 'components/JoinForm/NoProgramForm';

import { addAccount } from 'services/api';

import { startProgramDetails } from 'rt-store';

import { ROUTES } from 'rt-constants';

import './JoinForm.css';

const JoinForm = ({ v2 = false, currentState, hasProgram }) => {
  const [, setStartProgramDetails] = useAtom(startProgramDetails);
  const scroll = Scroll.animateScroll;

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
    scroll.scrollToTop();
    toast.success(
      // eslint-disable-next-line quotes
      "Thanks for your interest! Unfortunately this feature hasn't been implemented yet."
    );
  };

  return (
    <>
      <p className="sub-heading text-blue">
        {hasProgram ? 'Join' : 'Start'} a program in {currentState}
      </p>
      <div className={cls({ flex: !v2 })}>
        <section
          className={cls({
            'p-2': v2,
            'join-form': !v2,
            'mt-8': !v2,
            'w-1/2': !v2,
          })}
        >
          {!hasProgram ? (
            <NoProgramForm onSubmit={handleNoProgramSubmit} />
          ) : (
            <>
              <Tabs
                listClassName="mb-8"
                labels={['Test Admin', 'Program Admin']}
                panels={[
                  <TestAdminForm onSubmit={handleSubmit} />,
                  <ProgramAdminForm onSubmit={handleSubmit} />,
                ]}
              />
              <p className="mt-6">
                Need help with creating account?{' '}
                <Link to={ROUTES.CONTACT.path}>Contact support</Link>
              </p>
            </>
          )}
        </section>
        <section
          className={cls('pt-0 h-full', {
            'mt-8': !v2,
            'w-1/3': !v2,
            'p-12': !v2,
          })}
        >
          {hasProgram && (
            <>
              <InfoBox
                v2={v2}
                className="mb-4"
                heading="Test admins"
                subtext="are responsible for conducting tests, but are not running training
        programs across multiple sites."
              />
              <InfoBox
                v2={v2}
                heading="Program admins"
                subtext="are responsible for signing up new users, and running training programs.
        They are managing the rollout across multiple schools."
              />
            </>
          )}
          {!hasProgram && currentState && (
            <InfoBox
              v2={v2}
              className="mb-4"
              heading="CLIA waivers"
              subtext="CLIA waivers are issued in varying capacities depending on each state’s policy. A CLIA waiver allows the operating school to conduct and report tests in compliance with state and federal policy. CLIA waivers are not frequently owned by schools or other non-health organizations, so there can be some complications in obtaining these waivers. It’s recommended that there’s a scalable plan for providing CLIA waivers to all schools or organizations who will be participating in the program, for more information on obtaining CLIA waivers, click here."
            />
          )}
        </section>
      </div>
    </>
  );
};
export default JoinForm;
