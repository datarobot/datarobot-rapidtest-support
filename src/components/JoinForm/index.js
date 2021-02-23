// @ts-nocheck
// import { useTranslation } from 'react-i18next';

import Icon from 'components/Icon';
import Tabs from 'components/Tabs';

import ProgramAdminForm from 'components/JoinForm/ProgramAdminForm';
import TestAdminForm from 'components/JoinForm/TestAdminForm';

import './JoinForm.css';

const Joinform = ({ currentState }) => (
  // const { t } = useTranslation();

  <>
    <p className="sub-heading text-blue">Join a program in {currentState}</p>
    <div className="flex">
      <section className="join-form mt-8 w-1/2">
        <Tabs
          listClassName="mb-8"
          labels={['Test Admin', 'Program Admin']}
          panels={[<TestAdminForm />, <ProgramAdminForm />]}
        />
        <p className="mt-6">
          Need help with creating account?{' '}
          <a href="#contact">Contact support</a>
        </p>
      </section>
      <section className="mt-8 w-1/4 p-12">
        <p className="font-bold text-blue">
          Test admins <Icon iconName="question-circle" />
        </p>{' '}
        are responsible for conducting tests, but are not running training
        programs across multiple sites.
        <p className="font-bold text-blue mt-8">
          Program admins <Icon iconName="question-circle" />
        </p>
        are responsible for signing up new users, and running training programs.
        They are managing the rollout across multiple schools.
      </section>
    </div>
  </>
);
export default Joinform;
