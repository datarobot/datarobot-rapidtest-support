// @ts-nocheck
import { createContext, useEffect, useState } from 'react';
import { auth } from 'services/firebase';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loadingAuthState, setLoadingAuthState] = useState(true);

  useEffect(() => {
    auth().onAuthStateChanged((u) => {
      setUser(u);
      setLoadingAuthState(false);
    });
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
