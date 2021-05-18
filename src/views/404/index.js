import { Link, useHistory } from 'react-router-dom';
import PageHeader from 'components/PageHeader';

import { ROUTES } from 'rt-constants';

const Subtext = () => {
  const history = useHistory();

  return (
    <>
      <p>If you entered a web address, check it was entered correctly.</p>
      <p>
        You can more information on the{' '}
        <Link to={ROUTES.LANDING_PAGE.path}>home page</Link>.
      </p>
      <p className="mt-8">
        Or, you can{' '}
        <button className="btn-link" onClick={() => history.goBack()}>
          go back to the previous page
        </button>
        .
      </p>
    </>
  );
};

const FourOhFour = () => {
  const history = useHistory();
  return (
    <PageHeader
      headline="Page not found"
      subtext={<Subtext history={history} />}
    />
  );
};

export default FourOhFour;
