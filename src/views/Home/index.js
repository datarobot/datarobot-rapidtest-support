import { useAtom } from 'jotai';

import LoggedIn from 'components/Home/LoggedIn';
import LoggedOut from 'components/Home/LoggedOut';

import { authenticatedAtom } from 'store';

import './Home.css';

const Home = () => {
  const [authenticated] = useAtom(authenticatedAtom);

  return <>{authenticated ? <LoggedIn /> : <LoggedOut />}</>;
};

export default Home;
