import './PageHeader.css';

const PageHeader = ({ headline }) => (
  <section className="mt-8 w-3/5 relative">
    <h1 className="page-headline headline text-blue sticky">{headline}</h1>
    <p className="my-8">
      Reopen your schools. Rollout a COVID-19 testing program using RepidTest
      and send reports to government regulated relevant health authorities.
    </p>
  </section>
);

export default PageHeader;
