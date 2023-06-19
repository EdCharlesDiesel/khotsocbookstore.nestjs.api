

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  idNumber: string;
  emailAddress: string;
  password: string;
  birthday: Date | any;
  role: string;
  subscription: string;
  isLoggedIn: boolean
}
