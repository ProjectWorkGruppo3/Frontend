import axios from 'axios';
import { AdminUser } from '../models/admin-user';
import {
  AddAdminUserProps,
  DeleteAdminUserProps,
  GetAdminUserProps,
  GetAdminUsersProps,
  UpdateAdminUserProps
} from '../types/services/admin-service';
import { ServiceReturnType } from '../types/services/common-service';
import config from '../utils/config';

const AdminService = () => {
  const getAdminUsers = async (
    props: GetAdminUsersProps
  ): Promise<ServiceReturnType<AdminUser[]>> => {
    try {
      const result = await axios.get(
        `${config.API_URL}/Admins`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${props.token}`,
          },
        }
      );

      const admins = result.data as AdminUser[];

      return {
        data: admins,
        error: undefined,
      };
    } catch (error: any) {
      return {
        data: [],
        error: error,
      };
    }
  };

  const getAdminUser = async (
    props: GetAdminUserProps
  ): Promise<ServiceReturnType<AdminUser | undefined>> => {
    try {
      const result = await axios.get(
        `${config.API_URL}/Admins/${props.userId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: props.token,
          },
        }
      );

      const admins = result.data as AdminUser;

      return {
        data: admins,
        error: undefined,
      };
    } catch (error: any) {
      return {
        data: undefined,
        error: error,
      };
    }
  };

  const addAdminUser = async (
    props: AddAdminUserProps
  ): Promise<ServiceReturnType<AdminUser | null>> => {

    // FIXME add profilepic
    try {
      const response = await axios.post(
        `${config.API_URL}/Admins/`,
        {
          email: props.user.email,
          name: props.user.name,
          surname: props.user.surname,
          password: props.user.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${props.token}`,
          },
        }
      );

      return {
        data: response.data as AdminUser,
        error: undefined,
      };
    } catch (error: any) {
      return {
        data: null,
        error: error,
      };
    }
  };

  const updateAdminUser = async (
    props: UpdateAdminUserProps
  ): Promise<ServiceReturnType<boolean>> => {
    
    try {
      await axios.put(
        `${config.API_URL}/Admins/${props.user.id}`, 
        {
          email: props.user.email,
          name: props.user.name,
          surname: props.user.surname,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${props.token}`,
          },
        }
      );

      return {
        data: true,
        error: undefined,
      };
    } catch (error: any) {
      return {
        data: false,
        error: error,
      };
    }
  };

  const deleteAdminUser = async (
    props: DeleteAdminUserProps
  ): Promise<ServiceReturnType<boolean>> => {
    try {
      await axios.delete(
        `${config.API_URL}/Admins/${props.userId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${props.token}`,
          },
        }
      );

      return {
        data: true,
        error: undefined,
      };
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
    addAdminUser,
    updateAdminUser,
    deleteAdminUser,
  };
};

export default AdminService();
