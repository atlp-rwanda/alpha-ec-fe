export const regExPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  name: /^[a-zA-Z\s]{3,30}$/,
  address: /^.{3,500}$/,
  phone: /^(07\d{8}|\+\d{12})$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/,
};

export interface passwordChecksInt {
  regex: RegExp;
  message: string;
}

export const passwordChecks: passwordChecksInt[] = [
  {
    regex: /[A-Za-z]/,
    message: ', At least one letter',
  },
  {
    regex: /\d/,
    message: ', At least one number',
  },
  {
    regex: /[@#$%^&+=!]/,
    message: ', At least one special character (@#$%^&+=!)',
  },
  {
    regex: /^.{8,}$/,
    message: ', Minimum length of 8',
  },
];

export const testPassword = (password: string) => {
  if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/.test(password)) {
    let error = 'Please provide a password with';

    passwordChecks.forEach(check => {
      if (!check.regex.test(password)) {
        error += check.message;
      }
    });
    return `${error}!`;
  }
  return null;
};
