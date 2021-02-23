import { Link } from 'react-router-dom';

import Icon from 'components/Icon';

import { ROUTES } from 'rt-constants';

const LoggedIn = () => (
  <>
    <div className="hero flex mt-8">
      <section className="w-3/5 flex flex-col content-between items-between justify-between">
        <h1 className="headline text-blue">Welcome, User Person!</h1>

        <p className="mt-6 mb-12 text-lg">
          Reopen your schools. Rollout a COVID-19 testing program using
          RepidTest and send reports to government regulated relevant health
          authorities.
        </p>
      </section>
    </div>
    <section className="flex w-full">
      <div className="border-2 rounded w-1/2 py-6 px-4 mr-2">
        <h2 className="sub-heading">Manage Sites</h2>
        <p className="my-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae quisque
          urna quam mauris quis.
        </p>
        <Link to={ROUTES.SITES} className="btn-primary">
          CTA
        </Link>
      </div>
      <div className="border-2 rounded w-1/2 py-6 px-4 mr-2">
        <h2 className="sub-heading">Manage Accounts</h2>
        <p className="my-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae quisque
          urna quam mauris quis.
        </p>
        <Link to={ROUTES.ACCOUNTS} className="btn-primary">
          CTA
        </Link>
      </div>
    </section>

    <section className="flex w-full mt-12">
      <div className="w-1/4 mr-4">
        <h3 className="font-bold">FAQ</h3>
        <p className="my-2 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae quisque
          urna q uam mauris quis.
        </p>
        <a href="/" className="learn-more-link">
          Learn more <Icon iconName="long-arrow-right" className="ml-2" />
        </a>
      </div>
      <div className="w-1/4 mr-4">
        <h3 className="font-bold">Training Materials</h3>
        <p className="my-2 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae quisque
          urna q uam mauris quis.
        </p>
        <a href="/" className="learn-more-link">
          Learn more <Icon iconName="long-arrow-right" className="ml-2" />
        </a>
      </div>
      <div className="w-1/4 mr-4">
        <h3 className="font-bold">Contact Support</h3>
        <p className="my-2 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae quisque
          urna q uam mauris quis.
        </p>
        <a href="/" className="learn-more-link">
          Learn more <Icon iconName="long-arrow-right" className="ml-2" />
        </a>
      </div>
      <div className="w-1/4 mr-4">
        <h3 className="font-bold">Data and Dashboard</h3>
        <p className="my-2 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae quisque
          urna q uam mauris quis.
        </p>
        <a href="/" className="learn-more-link">
          Learn more <Icon iconName="long-arrow-right" className="ml-2" />
        </a>
      </div>
    </section>
  </>
);

export default LoggedIn;
