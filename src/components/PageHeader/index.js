import './PageHeader.css';

const PageHeader = ({ headline, subtext }) => (
  <section className="mt-8 w-3/5 relative">
    <h1 className="page-headline headline text-blue sticky">{headline}</h1>
    <span className="inline-block my-8">
      {subtext ||
        'Reopen your schools. Rollout a COVID-19 testing program using RapidTest and send reports to government regulated relevant health authorities.'}
    </span>
  </section>
);

export default PageHeader;
