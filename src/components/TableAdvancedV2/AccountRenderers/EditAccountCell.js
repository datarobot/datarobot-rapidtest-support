import { Link, generatePath } from 'react-router-dom';

import Icon from 'components/Icon';
import { ROUTES } from 'rt-constants';

const EditAccountCell = ({ data: { id } }) => (
  <Link
    to={generatePath(ROUTES.EDIT_ACCOUNT_V2.path, { id })}
    className="block w-full flex justify-center text-blue-lighter"
  >
    <Icon iconName="pen" type="fas" className="cursor-pointer" />
  </Link>
);

export default EditAccountCell;
