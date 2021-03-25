import { Link } from 'react-router-dom';

import Icon from 'components/Icon';
import { ROUTES } from 'rt-constants';

const EditAccountCell = ({ data }) => (
  <Link
    to={`${ROUTES.EDIT_ACCOUNT.path}/${data.id}`}
    className="block w-full flex justify-center"
  >
    <Icon
      iconName="pencil-alt"
      type="fal"
      color="#5282cc"
      className="cursor-pointer"
    />
  </Link>
);

export default EditAccountCell;
