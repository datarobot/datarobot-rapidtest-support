import React from 'react';

import AccountIdCell from './AccountIdCell';
import AccountStatusCell from './AccountStatusCell';
import AccountAddedCell from './AccountAddedCell';
import AccountEmailCell from './AccountEmailCell';
import EditAccountCell from './EditAccountCell';

import './AccountMobileCell.css';

const AccountMobileCell = ({ data }) => {
  return (
    <div className="AccountMobileCell">
      <div className="head">
        <AccountIdCell data={data} />
        <EditAccountCell data={data} />
      </div>
      <div className="field tall">
        <div>Name</div>
        <div>
          {data.last_name}, {data.first_name}
        </div>
      </div>
      <div className="field tall">
        <div>Email</div>
        <div>
          <AccountEmailCell data={data} />
        </div>
      </div>
      <div className="field">
        <div>Added</div>
        <div>
          <AccountAddedCell data={data} />
        </div>
      </div>
      <div className="field">
        <div>Status</div>
        <div>
          <AccountStatusCell data={data} />
        </div>
      </div>
    </div>
  );
};

export default AccountMobileCell;
