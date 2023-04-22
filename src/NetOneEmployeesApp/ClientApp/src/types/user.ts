export interface User {
  id: number;
  name: string;
  surname: string;
  phoneNumber?: string;
  emailAddress: string;
  password?: string;
  [key:string]: any;
}