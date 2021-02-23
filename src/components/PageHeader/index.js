import React from 'react';

const PageHeader = ({ headline }) => (
  <section className="mt-8 w-3/5">
    <h1 className="headline text-blue">{headline}</h1>
    <p className="my-8">
      Reopen your schools. Rollout a COVID-19 testing program using RepidTest
      and send reports to government regulated relevant health authorities.
    </p>
  </section>
);

export default PageHeader;
