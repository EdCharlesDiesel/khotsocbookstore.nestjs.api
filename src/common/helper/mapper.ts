import { User } from "../../modules/user/user.entity";
import { IUser } from "../../modules/user/interfaces/IUser";

export const toUserDto = (data: User): IUser => {
  const { id, username, email } = data;
  return { id, username, email, };
};
