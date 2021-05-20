import { Link, useHistory } from 'react-router-dom';
import PageHeaderV2 from 'components/PageHeaderV2';

import { ROUTES } from 'rt-constants';

const Subtext = () => {
  const history = useHistory();

  return (
    <>
      <p>If you entered a web address, check it was entered correctly.</p>
      <p>
        You can more information on the{' '}
        <Link to={ROUTES.LANDING_PAGE_V2.path}>home page</Link>.
      </p>
      <p className="mt-8">
        Or, you can{' '}
        <a className="cursor-pointer" onClick={() => history.goBack()}>
          go back to the previous page
        </a>
        .
      </p>
    </>
  );
};

const FourOhFour = () => {
  const history = useHistory();
  return (
    <PageHeaderV2
      headline="Page not found"
      subtext={<Subtext history={history} />}
      hideBack
    />
  );
};

export default FourOhFour;
