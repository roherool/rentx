import { classToClass } from "class-transformer";

import { IUserResponseDto } from "../dtos/IUserResponse.dto";
import { User } from "../infra/typeorm/entities/User";

class UserMap {
  static toDTO({
    id,
    name,
    email,
    avatar,
    isAdmin,
    avatar_url,
  }: User): IUserResponseDto {
    const user = classToClass({
      id,
      name,
      email,
      avatar,
      isAdmin,
      avatar_url,
    });
    return user;
  }
}

export { UserMap };
