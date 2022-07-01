import { User } from 'models/user';
import { AuthorizeProps } from './auth-service';

export interface UpdateProfileProps extends AuthorizeProps {
  user: User;
}
