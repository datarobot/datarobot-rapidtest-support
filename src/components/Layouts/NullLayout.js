import React, { Suspense } from 'react';

import Loading from 'components/Loading';

const NullLayout = ({ children }) => (
  <Suspense
    fallback={
      <Loading color="#00528D" size={256} containerClassName="full-height" />
    }
  >
    {children}
  </Suspense>
);

export default NullLayout;
