import React, { createContext, useEffect, useState } from 'react';
import { useContext } from 'react';
import { User } from '../types/user';

type AuthProviderProps = {
  children: JSX.Element;
};

type AuthState = {
  user: User;
  token: string;
  expiration: Date;
};

type authContext = {
  authState: AuthState | null;
  setAuthState: (state: AuthState | null) => void;
  isAuthenticated: () => boolean;
} | null;

const AuthContext = createContext<authContext>(null);
const TOKEN_KEY = 'serenup-auth';

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

  const [authState, setAuthState] = useState<AuthState | null>(null);

  useEffect(() => {
    const authStateSaved = getSavedAuthState();

    setAuthState(authStateSaved);
  }, [])
  const getSavedAuthState = () => {
    const data = localStorage.getItem(TOKEN_KEY);

    if(!data) {
      return null;
    }

    const authStateRetrieved  = JSON.parse(data) as AuthState;
    authStateRetrieved.expiration = new Date(authStateRetrieved.expiration);

    if(authStateRetrieved.expiration.getTime() < new Date().getTime()) {
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }

    return authStateRetrieved;
  }


  const isAuthenticated = (): boolean => {
    const token = localStorage.getItem(TOKEN_KEY);

    return token !== null;
  };

  const saveData = (state: AuthState) => {

    localStorage.setItem(TOKEN_KEY, JSON.stringify(state));
  }

  const setUser = (state: AuthState | null) => {
    if (state !== null) {
      saveData(state);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }

    setAuthState(state);
  };

  return (
    <AuthContext.Provider
      value={{
        authState: authState,
        setAuthState: setUser,
        isAuthenticated: isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { useAuth, AuthProvider };
