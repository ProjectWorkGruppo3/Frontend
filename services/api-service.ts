const ApiService = () => {

    const login = async ({ email, password }: {email: string, password: string}) => {

        // TODO connect to API
        // FIXME delete mock

        if(email === 'test@test.it' && password === '12345678') {
            return true;
        }


        return false;

    }


    return {
        login
    }
}

export default ApiService();