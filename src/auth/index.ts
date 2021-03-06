import { AuthChecker } from 'type-graphql';
import { verify } from 'jsonwebtoken';
import { AppContext } from '../graphql/types/AppContext';

const Auth: AuthChecker<AppContext> = ({ context }): boolean => {
  const authHeader = context.token;

  if (!authHeader) {
    return false;
  }

  const [, authorization] = authHeader.split(' ');

  try {
    const decoded = verify(authorization, process.env.TOKEN_SECRET);

    return !!decoded;
  } catch {
    return false;
  }
};

export default Auth;
