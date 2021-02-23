import { useAtom } from 'jotai';

import LoggedIn from 'components/Home/LoggedIn';
import LoggedOut from 'components/Home/LoggedOut';

import { loginAtom } from 'store';

import './Home.css';

const Home = () => {
  const [loggedIn] = useAtom(loginAtom);

  return <>{loggedIn ? <LoggedIn /> : <LoggedOut />}</>;
};

export default Home;
