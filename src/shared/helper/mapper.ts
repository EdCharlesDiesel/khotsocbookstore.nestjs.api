import { User } from "../../modules/user/user.entity";
import { IUser } from "../../modules/user/interfaces/IUser";

export const toUserDto = (data: User): IUser => {
  const { id, username, emailAddress } = data;
  return {
    birthday: undefined,
    firstName: "",
    idNumber: "",
    lastName: "",
    password: "",
    role: "",
    subscription: "",
    id: "",
    username: "",
    emailAddress: "",
    isLoggedIn: false
  };
};
