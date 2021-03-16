// @ts-nocheck
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from 'components/AuthProvider';
import Icon from 'components/Icon';
import { ROUTES } from 'rt-constants';
import trainingMaterials from 'assets/static/TrainingMaterials.pdf';

const LoggedIn = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="hero flex mt-8">
        <section className="w-3/5 flex flex-col content-between items-between justify-between">
          <h1 className="headline text-blue">
            Welcome {user?.displayName || ''}!
          </h1>

          <p className="mt-6 mb-12 text-lg">
            Reopen your schools. Rollout a COVID-19 testing program using
            RapidTest and send reports to government regulated relevant health
            authorities.
          </p>
        </section>
      </div>
      <section className="flex w-full">
        <div className="border-2 rounded w-1/2 py-6 px-4 mr-2">
          <h2 className="sub-heading">Manage Sites</h2>
          <p className="my-8">
            Add, remove, and edit sites from your state’s RapidTest application.
          </p>
          <Link to={ROUTES.SITES.path} className="btn-primary">
            View site list
          </Link>
        </div>
        <div className="border-2 rounded w-1/2 py-6 px-4 mr-2">
          <h2 className="sub-heading">Manage Accounts</h2>
          <p className="my-8">
            Approve, add, and disable test administrator accounts from your
            state's RapidTest application.
          </p>
          <Link to={ROUTES.ACCOUNTS.path} className="btn-primary">
            View proctor list
          </Link>
        </div>
      </section>

      <section className="flex w-full mt-12">
        <div className="w-1/4 mr-4">
          <h3 className="font-bold">FAQ</h3>
          <p className="my-2 text-sm">Frequently asked questions</p>
          <Link to={ROUTES.FAQ.path} className="learn-more-link">
            Learn more <Icon iconName="long-arrow-right" className="ml-2" />
          </Link>
        </div>
        <div className="w-1/4 mr-4">
          <h3 className="font-bold">Training Materials</h3>
          <p className="my-2 text-sm">
            View implementation and on the ground training materials
          </p>
          <a href={trainingMaterials} className="learn-more-link">
            Learn more <Icon iconName="long-arrow-right" className="ml-2" />
          </a>
        </div>
        <div className="w-1/4 mr-4">
          <h3 className="font-bold">Contact Support</h3>
          <p className="my-2 text-sm">Send a message to our support team</p>
          <Link to={ROUTES.CONTACT.path} className="learn-more-link">
            Learn more <Icon iconName="long-arrow-right" className="ml-2" />
          </Link>
        </div>
        <div className="w-1/4 mr-4">
          <h3 className="font-bold">Data and Dashboard</h3>
          <p className="my-2 text-sm">View test result data</p>
          <Link to={ROUTES.DASHBOARD.path} className="learn-more-link">
            Learn more <Icon iconName="long-arrow-right" className="ml-2" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default LoggedIn;
