import { AdminUser } from '../../models/admin-user';
import { AuthorizeProps } from './auth-service';

export interface GetAdminUsersProps extends AuthorizeProps {}

export interface GetAdminUserProps extends AuthorizeProps {
  userId: string;
}

export interface UpdateAdminUserProps extends AuthorizeProps {
  user: AdminUser;
}

export interface DeleteAdminUserProps extends AuthorizeProps {
  userId: string;
}

export interface AddAdminUserProps extends AuthorizeProps {
  user: AdminUserCreated;
}

export interface AdminUserCreated {
  id: string;
  email: string;
  name: string;
  surname: string;
  password: string;
  profilePic?: string;
}
