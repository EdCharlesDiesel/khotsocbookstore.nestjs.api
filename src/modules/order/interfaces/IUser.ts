

export interface IUser {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthday?: Date;
  //  entries?: Array<Entry>;
}
