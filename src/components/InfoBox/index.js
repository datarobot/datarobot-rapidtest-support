import cls from 'classnames';
import Icon from 'components/Icon';

const InfoBox = ({ v2 = false, heading, subtext, className }) => (
  <aside className={className}>
    {v2 ? null : (
      <div className={cls('leading-8 text-blue')}>
        <Icon iconName="question-circle" type="fal" />
      </div>
    )}
    <p className="font-bold mb-2 mt-4">
      {v2 ? (
        <Icon iconName="question-circle" type="fal" className="mr-2" />
      ) : null}
      {heading}
    </p>
    <p>{subtext || ''}</p>
  </aside>
);

export default InfoBox;
