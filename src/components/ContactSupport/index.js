import React from 'react';

import { CONTACT_EMAIL } from 'rt-constants';

import support from 'assets/images/auth/support.svg';

import './ContactSupport.css';

const ContactSupport = () => {
  return (
    <div className="ContactSupport">
      <img src={support} alt="" />
      <div>
        <span>If you have any questions</span>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=rapidtestingapp.org%20Support%20Request`}
        >
          Contact support
        </a>
      </div>
    </div>
  );
};

export default ContactSupport;
