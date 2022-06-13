import React, {
    createContext,
    useState
} from 'react';
import { useContext } from 'react';
import { User } from '../types/user';


type AuthProviderProps = {
    children: JSX.Element
}

type AuthState = {
    user: User,
    token: string,
    expiration: Date
}

type authContext = {
    authState: AuthState | null,
    setAuthState: (state: AuthState | null) => void,
    isAuthenticated: () => boolean
} | null;

const AuthContext = createContext<authContext>(null);
const TOKEN_KEY = 'serenup-auth';


const AuthProvider : React.FC<AuthProviderProps> = ({ children }) => {

    const [authState, setAuthState] = useState<AuthState | null>(null);

    const isAuthenticated = () : boolean => {
        const token = localStorage.getItem(TOKEN_KEY);

        return token !== null;
    }

    const setUser = (state: AuthState | null) => {

        if(state !== null) {
            localStorage.setItem(TOKEN_KEY, state.token);
        } else {
            localStorage.removeItem(TOKEN_KEY);
        }

        setAuthState(state)
    }

    return (
        <AuthContext.Provider
            value={{
                authState: authState,
                setAuthState: setUser,
                isAuthenticated: isAuthenticated
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext);

    return context;
}

export {
    useAuth,
    AuthProvider
}