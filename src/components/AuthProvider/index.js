// @ts-nocheck
import { createContext, useEffect, useState } from 'react';
import { auth, getUser } from 'services/firebase';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loadingAuthState, setLoadingAuthState] = useState(true);

  useEffect(() => {
    auth().onAuthStateChanged(async (u) => {
      if (!u) {
        setUser(null);
      }

      if (u && !user) {
        const { claims } = await getUser();
        const { dashboard_user, proctor_admin, site_admin } = claims;

        setUser({
          ...u,
          roles: {
            dashboard: dashboard_user,
            proctor: proctor_admin,
            site: site_admin,
          },
        });

        setLoadingAuthState(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated: user !== null,
        setUser,
        loadingAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
