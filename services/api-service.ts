const ApiService = () => {
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    // TODO connect to API
    // FIXME delete mock

    if (email === 'test@test.it' && password === '12345678') {
      return true;
    }

    return false;
  };

  interface SignUpProps {
    email: string;
    password: string;
    birthday: Date;
    deviceCode: string;
    height: number;
    weight: number;
  }

  const signup = async (props: SignUpProps) => {
    return true;
  };

  return {
    login,
    signup,
  };
};

export default ApiService();
