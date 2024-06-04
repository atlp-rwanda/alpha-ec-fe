import { RegistrationKeys } from '@/app/(Authentication)/register/page';

interface RegistrationField {
  label: string;
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
  key: RegistrationKeys;
  message: string;
}
export const RegistrationFields: RegistrationField[] = [
  {
    key: 'name',
    label: 'Full Name',
    placeholder: 'Full name',
    type: 'text',
    message: 'Please provide a valid name!'
  },
  {
    key: 'phone',
    label: 'Phone Number',
    placeholder: 'Phone Number',
    type: 'text',
    message: 'Please provide a valid phone number start with 078/079/072/073'
  },
  {
    key: 'email',
    label: 'Email',
    placeholder: 'Email',
    type: 'text',
    message: 'Please provide a valid email, Eg: test@gmail.com!'
  },
  {
    key: 'address',
    label: 'Address',
    placeholder: 'Address',
    type: 'text',
    message: 'Please provide a valid address!'
  },
  {
    key: 'password',
    label: 'Password',
    placeholder: 'Password',
    type: 'password',
    message: 'Please provide a valid password'
  }
];
