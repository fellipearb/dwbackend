import { hash, compare } from 'bcryptjs';

export const encrypt = (password: string) => {
  return hash(password, 5);
};

export const comparePassword = (password: string, dbpassword: string) => {
  return compare(password, dbpassword);
};
