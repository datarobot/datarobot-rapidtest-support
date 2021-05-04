import React, { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';

import Loading from 'components/Loading';
import HeaderV2 from 'components/HeaderV2';
import FooterV2 from 'components/FooterV2';

import bg1 from 'assets/images/backgrounds/1.svg';
import bg2 from 'assets/images/backgrounds/2.svg';
import bg3 from 'assets/images/backgrounds/3.svg';
import bg4 from 'assets/images/backgrounds/4.svg';
import bg5 from 'assets/images/backgrounds/5.svg';

import './LayoutV2.css';

const LayoutV2 = ({ children, landingBackground = false }) => (
  <div className="LayoutV2">
    {landingBackground && (
      <>
        <div className="bg bg1">
          <img src={bg1} alt="" />
        </div>
        <div className="bg bg2">
          <img src={bg2} alt="" />
        </div>
        <div className="bg bg3">
          <img src={bg3} alt="" />
        </div>
        <div className="bg bg4">
          <img src={bg4} alt="" />
        </div>
        <div className="bg bg5">
          <img src={bg5} alt="" />
        </div>
      </>
    )}
    <HeaderV2 />
    <main className="content">
      <Suspense
        fallback={
          <Loading
            color="#00528D"
            size={256}
            containerClassName="full-height"
          />
        }
      >
        {children}
      </Suspense>
    </main>
    <FooterV2 />
    <ToastContainer
      position="bottom-center"
      toastClassName="rt-toast"
      autoClose={2500}
      limit={2}
    />
  </div>
);

export default LayoutV2;
