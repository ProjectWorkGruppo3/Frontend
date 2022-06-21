import axios from 'axios';
import { AdminUser } from '../models/admin-user';
import {
  GetAdminUsersProps,
  GetAdminUserProps,
  UpdateAdminUserProps,
  DeleteAdminUserProps,
} from '../types/services/admin-service';
import { ServiceReturnType } from '../types/services/common-service';
import config from '../utils/config';

const AdminService = () => {
  const getAdminUsers = async (props: GetAdminUsersProps) => {
    const result = await axios.get(
      `${config.API_URL}/users/admins`, // FIXME
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: props.token,
        },
      }
    );

    const admins = result.data as AdminUser[];

    return admins;
  };

  const getAdminUser = async (props: GetAdminUserProps) => {
    const result = await axios.get(
      `${config.API_URL}/users/admins/${props.userId}`, // FIXME
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: props.token,
        },
      }
    );

    const admins = result.data as AdminUser[];

    return admins;
  };

  const updateAdminUser = async (props: UpdateAdminUserProps) => {
    await axios.put(
      `${config.API_URL}/users/admins/${props.user.id}`, // FIXME
      {
        email: props.user.email,
        name: props.user.name,
        surname: props.user.surname,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: props.token,
        },
      }
    );
  };

  const deleteAdminUser = async (
    props: DeleteAdminUserProps
  ): Promise<ServiceReturnType<boolean>> => {
    try {
      await axios.delete(
        `${config.API_URL}/users/admins/${props.userId}`, // FIXME
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: props.token,
          },
        }
      );

      return { data: true };
    } catch (error: any) {
      return {
        data: false,
        error: error,
      };
    }
  };

  return {
    getAdminUsers,
    getAdminUser,
    updateAdminUser,
    deleteAdminUser,
  };
};

export default AdminService();
