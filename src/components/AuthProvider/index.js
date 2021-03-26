// @ts-nocheck
import { createContext, useEffect, useState } from 'react';
import { app, getUser } from 'services/firebase';
import { get, getUserRole } from 'utils';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    app[get('program') || 'PA'].auth().onAuthStateChanged(async (u) => {
      console.log(u);
      if (!u) {
        return setUser(null);
      }

      if (u && !user) {
        const { claims } = await getUser();
        const { dashboard_user, proctor_admin, site_admin } = claims;

        if (!dashboard_user || !proctor_admin || !site_admin) {
          return;
        }

        setUser({
          ...u,
          roles: {
            dashboard_user,
            proctor_admin,
            site_admin,
          },
          role: getUserRole({ dashboard_user, proctor_admin, site_admin }),
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated: user !== null,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
