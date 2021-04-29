import React, { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';

import Loading from 'components/Loading';
import HeaderV2 from 'components/HeaderV2';
import FooterV2 from 'components/FooterV2';

import './LayoutV2.css';

const LayoutV2 = ({ children }) => (
  <div className="LayoutV2">
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
