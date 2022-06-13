import { User } from "../types/user";

interface LoginProps {
  email: string,
  password: string
}

type LoginResult = {
  user: User,
  token: string,
  expiration: Date
} | null;

const ApiService = () => {
  const login = async ({ email, password,}: LoginProps) : Promise<LoginResult> => {
    // TODO connect to API
    // FIXME delete mock

    if (email === 'test@test.it' && password === '12345678') {
      const now = new Date()
      return {
        token: 'sdadasas',
        user: {
          birthday: new Date(),
          email: 'test@test.it',
          deviceCode: 'sdadadasas',
          name: 'test',
          surname: 'test',
          height: 180,
          weight: 80
        },
        expiration: new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours()+1)
      }
    }

    return null;
  };

  return {
    login,
  };
};

export default ApiService();
