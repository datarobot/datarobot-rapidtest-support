import cls from 'classnames';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons/faQuestionCircle';

import Icon from 'components/Icon';

const InfoBox = ({ v2 = false, heading, subtext, className }) => (
  <aside className={className}>
    {v2 ? null : (
      <div className={cls('leading-8 text-blue')}>
        <Icon iconName={faQuestionCircle} />
      </div>
    )}
    <p className="font-bold mb-2 mt-4">
      {v2 ? <Icon iconName={faQuestionCircle} className="mr-2" /> : null}
      {heading}
    </p>
    <p>{subtext || ''}</p>
  </aside>
);

export default InfoBox;
