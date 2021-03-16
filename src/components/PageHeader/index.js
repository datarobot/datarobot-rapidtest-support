import cls from 'classnames';

import './PageHeader.css';

const PageHeader = ({ headline, subtext }) => (
  <section className="mt-8 w-3/5 relative">
    <h1 className="page-headline headline text-blue sticky">{headline}</h1>
    <span
      className={cls('inline-block', {
        'my-8': subtext,
        'mb-4': !subtext,
      })}
    >
      {subtext}
    </span>
  </section>
);

export default PageHeader;
