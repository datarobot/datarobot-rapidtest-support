import React, { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';

import Loading from 'components/Loading';
import Header from 'components/Header';
import Footer from 'components/Footer';

import './LayoutV1.css';

const LayoutV1 = ({ children }) => (
  <div className="LayoutV1">
    <Header />
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
    <Footer />
    <ToastContainer
      position="bottom-center"
      toastClassName="rt-toast"
      autoClose={2500}
      limit={2}
    />
  </div>
);

export default LayoutV1;
