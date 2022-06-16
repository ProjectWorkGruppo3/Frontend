// FIXME add name and surname to BE
export type User = {
  email: string;
  // name: string;
  // surname: string;
  // deviceCode: string;
  birthday: Date;
  height: number;
  weight: number;
};

export interface LoginUser {
  email: string;
  password: string;
}
