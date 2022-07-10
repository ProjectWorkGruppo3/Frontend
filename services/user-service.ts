import axios from 'axios';
import { ServiceReturnType } from 'types/services/common-service';
import { UpdateProfileProps } from 'types/services/user-service';
import config from 'utils/config';

const UserService = () => {
  const updateProfile = async (
    props: UpdateProfileProps
  ): Promise<ServiceReturnType<boolean>> => {
    try {
      await axios.post(
        `${config.API_URL}/Users/${props.user.id}`,
        {
          email: props.user.email,
          name: props.user.name,
          surname: props.user.surname,
          dayOfBirth: props.user.birthday,
          weight: props.user.weight,
          height: props.user.height,
          job: props.user.job,
          emergencyContacts: props.user.emergencyContacts,
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

  return {
    updateProfile,
  };
};

export default UserService();
