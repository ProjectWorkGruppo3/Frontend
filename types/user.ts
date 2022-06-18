/*
{
    "email": "string",
    "password": "string",
    "name": "string",
    "surname": "string",
    "deviceCode": "string",
    "birthday": "datetime",
    "height": "number",
    "weight": "number"
}
*/
export type User = {
  id: string;
  email: string;
  name: string;
  surname: string;
  birthday: Date;
  height: number;
  weight: number;
};

export interface LoginUser {
  email: string;
  password: string;
}
