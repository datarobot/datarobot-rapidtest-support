import { Link } from 'react-router-dom';

import { ROUTES } from 'rt-constants';

const Unauthorized = () => (
  <div className="w-full full-height flex flex-col justify-center items-center">
    <p className="sub-heading text-dark-red">
      You don't have the proper authorization to view this page.
    </p>
    <p className="mt-8">
      If you think should have access to this page, please{' '}
      <Link to={ROUTES.CONTACT.path}>contact support</Link>.
    </p>
  </div>
);

export default Unauthorized;
