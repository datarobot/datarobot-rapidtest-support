import React from 'react';

import Highlight from '../../Highlight';
import SiteIdCell from './SiteIdCell';
import DisableSiteCell from './DisableSiteCell';

import './SiteMobileCell.css';

const SiteMobileCell = ({ data }) => {
  return (
    <div className="SiteMobileCell">
      <div className="head">
        <SiteIdCell data={data} />
        <DisableSiteCell value={data.archive} data={data} />
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
        <Highlight text={data.district || '-'} />
      </div>
      <div className="field">
        <div>Contact</div>
        <Highlight text={data.contact_name || '-'} />
      </div>
    </div>
  );
};

export default SiteMobileCell;
