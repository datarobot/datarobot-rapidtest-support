import { Link } from 'react-router-dom';
import { ROUTES } from 'rt-constants';

import Icon from 'components/Icon';

const AccountNameCell = ({ data }) => (
  <>
    <Link to={`${ROUTES.EDIT_ACCOUNT.path}/${data.id}`} className="mr-2">
      <Icon
        iconName="pencil-alt"
        type="fal"
        color="#5282cc"
        className="cursor-pointer"
      />
    </Link>{' '}
    {data.last_name}, {data.first_name}
  </>
);

export default AccountNameCell;
