import { AdminUser } from '../../models/admin-user';
import { AuthorizeProps } from './auth-service';

export interface AddNewDeviceProps extends AuthorizeProps {
  name: string;
  id: string;
}

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
