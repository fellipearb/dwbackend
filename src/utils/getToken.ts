import { verify } from 'jsonwebtoken';

export type TTOken = {
  id: number;
  name: string;
  company: { id: number; name: string };
};

const getToken = async (token): Promise<TTOken | null> => {
  const [, authorization] = token.split(' ');

  const user = <TTOken>verify(authorization, process.env.TOKEN_SECRET);

  if (!user) {
    return null;
  }

  return user;
};

export default getToken;
