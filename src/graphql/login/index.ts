import { sign } from "jsonwebtoken";
import { Resolver, Query, Arg } from "type-graphql";
import * as db from "../../database/db";
import { comparePassword } from "../../utils/password";
import { UserType } from "../users/types";
import { LoginInput } from "./types";

@Resolver()
export class LoginResolver {
  @Query(() => UserType)
  async doLogin(@Arg("LoginData") LoginData: LoginInput): Promise<UserType> {
    const { login, password } = LoginData;

    const user = await db.default.users.findOne({ where: { login } });

    if (!user) {
      throw new Error("Could not find user");
    }

    const verify = comparePassword(password, user.password);

    if (!verify) {
      throw new Error("Bad password");
    }

    return {
      ...user.dataValues,
      password: "",
      accessToken: sign({ ...user.dataValues }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRES_IN,
      }),
    };
  }
}
