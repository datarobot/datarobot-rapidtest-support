import React from 'react';
import SiteIdCell from './SiteIdCell';

import './SiteMobileCell.css';
import DisableSiteCell from './DisableSiteCell';

const SiteMobileCell = ({ data }) => {
  console.log({ data });
  return (
    <div className="SiteMobileCell">
      <div className="head">
        <SiteIdCell data={data} />
        <DisableSiteCell value={data.archive} data={data} />
      </div>
      <div className="field tall">
        <div>Name</div>
        <div>{data.site_name}</div>
      </div>
      <div className="field tall">
        <div>Address</div>
        <div>
          {data.street}, {data.city} {data.state} {data.zip}
        </div>
      </div>
      <div className="field">
        <div>District</div>
        <div>{data.district || '-'}</div>
      </div>
      <div className="field">
        <div>Contact</div>
        <div>{data.contact_name || '-'}</div>
      </div>
    </div>
  );
};

export default SiteMobileCell;
