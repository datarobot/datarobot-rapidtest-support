import React from 'react';

import Highlight from '../Highlight';
import IdCell from '../TableAdvancedV2/SiteRenderers/IdCell';
import DisableCell from '../TableAdvancedV2/SiteRenderers/DisableCell';

import './MobileCell.css';

const SiteMobileCell = ({ data }) => {
  return (
    <div className="MobileCell">
      <div className="head">
        <IdCell data={data} />
        <DisableCell value={data.archive} data={data} />
      </div>
      <div className="field tall">
        <div>Name</div>
        <Highlight text={data.site_name} />
      </div>
      <div className="field tall">
        <div>Address</div>
        <Highlight
          text={`${data.street}, ${data.city} ${data.state} ${data.zip}`}
        />
      </div>
      <div className="field">
        <div>District</div>
        <Highlight text={data.district} />
      </div>
      <div className="field">
        <div>Contact</div>
        <Highlight text={data.contact_name} />
      </div>
    </div>
  );
};

export default SiteMobileCell;
