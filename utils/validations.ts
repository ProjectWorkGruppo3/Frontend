export const validateEmail = (email: string): string | null => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email.toLowerCase()
  )
    ? null
    : 'Please type a valid e-mail';
};

export const validatePassword = (password: string): string | null => {
  const passwordRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$'
  );
  return passwordRegex.test(password)
    ? null
    : 'Please, type the password that have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character ';
};
