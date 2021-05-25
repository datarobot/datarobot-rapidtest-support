import React from 'react';
import { format } from 'date-fns';

import Highlight from '../Highlight';

import IdCell from '../TableAdvancedV2/AccountRenderers/IdCell';
import StatusCell from '../TableAdvancedV2/AccountRenderers/StatusCell';
import EmailCell from '../TableAdvancedV2/AccountRenderers/EmailCell';
import EditCell from '../TableAdvancedV2/AccountRenderers/EditCell';

import './MobileCell.css';

const AccountMobileCell = ({ data }) => {
  return (
    <div className="MobileCell">
      <div className="head">
        <IdCell data={data} />
        <EditCell data={data} />
      </div>
      <div className="field tall">
        <div>Name</div>
        <Highlight text={`${data.last_name}, ${data.first_name}`} />
      </div>
      <div className="field tall">
        <div>Email</div>
        <EmailCell data={data} />
      </div>
      <div className="field">
        <div>Added</div>
        <Highlight
          text={
            data.welcome_email_sent &&
            format(new Date(data.welcome_email_sent), 'MM-dd-yyyy')
          }
        />
      </div>
      <div className="field">
        <div>Status</div>
        <div>
          <StatusCell data={data} />
        </div>
      </div>
    </div>
  );
};

export default AccountMobileCell;
