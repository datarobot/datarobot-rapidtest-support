// @ts-nocheck
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from 'rt-constants';
import { AuthContext } from 'components/AuthProvider';
import LayoutV2 from 'components/Layouts/LayoutV2';

import arrowRight from 'assets/images/home/arrow-right.svg';
import sites from 'assets/images/admin/sites.svg';
import operators from 'assets/images/admin/operators.svg';
import './AdminV2.css';

const AdminV2 = () => {
  const {
    user: { displayName },
  } = useContext(AuthContext);

  return (
    <LayoutV2 adminBackground>
      <div className="AdminV2">
        <section className="mt-8 flex flex-col content-between items-between justify-between">
          <h1>
            Welcome{displayName ? ', ' : ''}
            {displayName}!
          </h1>

          <p className="md:w-4/5 mt-6 mb-12 text-lg">
            Reopen your schools. Rollout a COVID-19 testing program using
            RapidTest and send reports to government regulated relevant health
            authorities.
          </p>
        </section>
        <section className="flex w-full flex-col lg:flex-row mb-8">
          <Link to={ROUTES.SITES_V2.path} className="no-underline lg:w-1/2">
            <div className="tile">
              <div className="content">
                <img src={sites} alt="" />
                <div>
                  <h4>Sites</h4>
                  <p>
                    Add, remove, and edit sites from your state’s RapidTest
                    application.
                  </p>
                </div>
              </div>
              <div className="arrow">
                <img src={arrowRight} alt="" />
              </div>
            </div>
          </Link>
          <Link to={ROUTES.ACCOUNTS_V2.path} className="no-underline lg:w-1/2">
            <div className="tile">
              <div className="content">
                <img src={operators} alt="" />
                <div>
                  <h4>Test Operators</h4>
                  <p>
                    Approve, add, and disable test administrator accounts from
                    your state's RapidTest application.
                  </p>
                </div>
              </div>
              <div className="arrow">
                <img src={arrowRight} alt="" />
              </div>
            </div>
          </Link>
        </section>
      </div>
    </LayoutV2>
  );
};

export default AdminV2;
