import cls from 'classnames';
import { useHistory } from 'react-router-dom';

const PageHeaderV2 = ({
  hideBack = false,
  headline,
  subtext,
  subtextClass,
}) => {
  const history = useHistory();

  return (
    <section className="mt-8 w-3/5">
      {!hideBack && (
        <p className="cursor-pointer">
          <a onClick={() => history.goBack()}>Back</a>
        </p>
      )}
      <h2>{headline}</h2>
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
};

export default PageHeaderV2;
