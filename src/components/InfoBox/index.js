import cls from 'classnames';
import Icon from 'components/Icon';

const InfoBox = ({ heading, subtext, className }) => (
  <aside className={className}>
    <div className={cls('leading-8 text-blue')}>
      <Icon iconName="question-circle" type="fal" />
    </div>
    <p className="font-bold mb-2 mt-4">{heading}</p>
    <p>{subtext || ''}</p>
  </aside>
);

export default InfoBox;
