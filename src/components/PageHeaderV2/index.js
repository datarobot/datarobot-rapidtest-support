import cls from 'classnames';

const PageHeaderV2 = ({ headline, subtext, subtextClass }) => (
  <section className="mt-8 w-3/5">
    <h1>{headline}</h1>
    {subtext && (
      <span
        className={cls('inline-block', subtextClass, {
          'my-8': subtext,
          'mb-4': !subtext,
        })}
      >
        {subtext}
      </span>
    )}
  </section>
);

export default PageHeaderV2;
