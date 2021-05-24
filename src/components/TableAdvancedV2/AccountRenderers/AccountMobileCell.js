import React from 'react';
import { format } from 'date-fns';

import Highlight from '../../Highlight';

import AccountIdCell from './AccountIdCell';
import AccountStatusCell from './AccountStatusCell';
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
        <Highlight text={`${data.last_name}, ${data.first_name}`} />
      </div>
      <div className="field tall">
        <div>Email</div>
        <AccountEmailCell data={data} />
      </div>
      <div className="field">
        <div>Added</div>
        <Highlight
          text={
            data.welcome_email_sent
              ? format(new Date(data.welcome_email_sent), 'MM-dd-yyyy')
              : '-'
          }
        />
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
