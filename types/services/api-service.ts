import { User } from "../user";

export interface AuthorizeProps {
    token: string;
}

export interface LoginProps {
    email: string;
    password: string;
}


export type LoginResult = {
    user: User;
    token: string;
    expiration: Date;
} | null;

export interface SignUpProps {
    email: string;
    password: string;
    birthday: Date;
    deviceCode: string;
    height: number;
    weight: number;
}

export interface GetDevicesProps extends AuthorizeProps {
    userId: string;
}

export interface GetDeviceData extends AuthorizeProps{
    userId: string;
    deviceId: string;
}

export interface AddNewDeviceData extends AuthorizeProps{
    name: string;
    id: string;
}