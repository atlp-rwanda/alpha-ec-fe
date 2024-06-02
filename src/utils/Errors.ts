import { RegistrationKeys } from '@/app/(Authentication)/register/page';

export interface FormErrorInterface {
  status: 'Success!' | 'Error';
  message: string;
  data: { field: string; message: string }[];
}

export interface ErrorInterface {
  target: RegistrationKeys;
  msg: string;
}

export const getErrorForField = (
  errors: ErrorInterface[],
  key: RegistrationKeys
) => {
  const error = errors.find(error => error.target === key);
  return error ? error.msg : null;
};
