// @ts-nocheck
import { useContext } from 'react';

import LoggedIn from 'components/Home/LoggedIn';
import LoggedOut from 'components/Home/LoggedOut';

import { AuthContext } from 'components/AuthProvider';

import './Home.css';

const Home = () => {
  const { authenticated } = useContext(AuthContext);

  return <>{authenticated ? <LoggedIn /> : <LoggedOut />}</>;
};

export default Home;
