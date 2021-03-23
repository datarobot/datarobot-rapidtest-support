import { Link } from 'react-router-dom';
import { ROUTES } from 'rt-constants';

import Icon from 'components/Icon';

const SiteNameCell = ({ data }) => (
  <>
    <Link to={`${ROUTES.EDIT_SITE.path}/${data.id}`} className="mr-2">
      <Icon
        iconName="pencil-alt"
        type="fal"
        color="#5282cc"
        className="cursor-pointer"
      />
    </Link>{' '}
    {data.site_name}
  </>
);

export default SiteNameCell;
