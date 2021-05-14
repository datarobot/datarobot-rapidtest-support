import { Link, generatePath } from 'react-router-dom';

import { ROUTES } from 'rt-constants';

import pencil from 'assets/images/icons/pencil.svg';

const EditAccountCell = ({ data: { id } }) => (
  <Link
    to={generatePath(ROUTES.EDIT_ACCOUNT_V2.path, { id })}
    className="block w-full flex justify-center text-blue-lighter"
  >
    <img src={pencil} alt="" className="cursor-pointer" />
  </Link>
);

export default EditAccountCell;
