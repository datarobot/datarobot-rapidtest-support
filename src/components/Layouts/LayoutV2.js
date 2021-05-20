import React, { Suspense } from 'react';
import cls from 'classnames';
import { ToastContainer } from 'react-toastify';

import Loading from 'components/Loading';
import HeaderV2 from 'components/HeaderV2';
import FooterV2 from 'components/FooterV2';

import bga1 from 'assets/images/backgrounds/a1.svg';
import bga2 from 'assets/images/backgrounds/a2.svg';
import bga3 from 'assets/images/backgrounds/a3.svg';

import bg1 from 'assets/images/backgrounds/1.svg';
import bg2 from 'assets/images/backgrounds/2.svg';
import bg3 from 'assets/images/backgrounds/3.svg';
import bg4 from 'assets/images/backgrounds/4.svg';
import bg5 from 'assets/images/backgrounds/5.svg';

import './LayoutV2.css';

const LayoutV2 = ({
  children,
  headerHidden = false,
  footerHidden = false,
  footerFixed = false,
  backgroundAuth = false,
  backgroundAdmin = false,
  backgroundLanding = false,
  wide = false,
}) => (
  <div className="LayoutV2 layout">
    {backgroundAuth && (
      <>
        <div className="bga bga1">
          <img src={bga1} alt="" />
        </div>
        <div className="bga bga2">
          <img src={bga2} alt="" />
        </div>
      </>
    )}
    {backgroundAdmin && (
      <>
        <div className="bgd bgd1">
          <img src={bga1} alt="" />
        </div>
        <div className="bgd bgd3">
          <img src={bga3} alt="" />
        </div>
      </>
    )}
    {backgroundLanding && (
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
    {headerHidden ? null : <HeaderV2 />}
    <main className={cls('content', { limitWidth: !wide })}>
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
    {footerHidden ? null : <FooterV2 footerFixed={footerFixed} />}
    <ToastContainer
      position="bottom-center"
      toastClassName="rt-toast"
      autoClose={2500}
      limit={2}
    />
  </div>
);

export default LayoutV2;
