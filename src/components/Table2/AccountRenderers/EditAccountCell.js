import { Link } from 'react-router-dom';

import Icon from 'components/Icon';
import { ROUTES } from 'rt-constants';

const EditAccountCell = ({ data }) => (
  <Link
    to={`${ROUTES.EDIT_ACCOUNT.path}/${data.id}`}
    className="block w-full flex justify-center text-blue-lighter"
  >
    <Icon iconName="pen" type="fas" className="cursor-pointer" />
  </Link>
);

export default EditAccountCell;
