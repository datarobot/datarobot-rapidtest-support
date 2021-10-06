import { Link, generatePath } from 'react-router-dom';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';

import Icon from 'components/Icon';
import { ROUTES } from 'rt-constants';

const EditAccountCell = ({ data: { id } }) => (
  <Link
    to={generatePath(ROUTES.EDIT_ACCOUNT.path, { id })}
    className="block w-full flex justify-center text-blue-lighter"
  >
    <Icon iconName={faPen} className="cursor-pointer" />
  </Link>
);

export default EditAccountCell;
