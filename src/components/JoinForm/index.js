// @ts-nocheck
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import InfoBox from 'components/InfoBox';
import Tabs from 'components/Tabs';

import ProgramAdminForm from 'components/JoinForm/ProgramAdminForm';
import TestAdminForm from 'components/JoinForm/TestAdminForm';
import NoProgramForm from 'components/JoinForm/NoProgramForm';

import { addAccount } from 'services/api';

import { ROUTES } from 'rt-constants';

import './JoinForm.css';

const Joinform = ({ currentState, hasProgram }) => {
  const handleSubmit = (data) => {
    addAccount(data)
      .then(() => {
        toast.success('Request submitted!');
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <>
      <p className="sub-heading text-blue">
        {hasProgram ? 'Join' : 'Start'} a program in {currentState}
      </p>
      <div className="flex">
        <section className="join-form mt-8 w-1/2">
          {!hasProgram ? (
            <NoProgramForm />
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
                <Link to={ROUTES.CONTACT}>Contact support</Link>
              </p>
            </>
          )}
        </section>
        <section className="mt-8 w-1/4 p-12 pt-0 h-full">
          {hasProgram && (
            <>
              <InfoBox
                className="mb-4"
                heading="Test admins"
                subtext="are responsible for conducting tests, but are not running training
        programs across multiple sites."
              />
              <InfoBox
                heading="Program admins"
                subtext="are responsible for signing up new users, and running training programs.
        They are managing the rollout across multiple schools."
              />
            </>
          )}
        </section>
      </div>
    </>
  );
};
export default Joinform;
