import React, { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';

import Loading from '../Loading';
import Header from '../Header';
import Footer from '../Footer';

const LayoutV1 = ({ children }) => (
  <div className="App">
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
