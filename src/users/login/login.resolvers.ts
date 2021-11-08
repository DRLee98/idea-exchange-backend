import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { failError } from "../../common/common.utils";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    login: async (_, { email, password }, { client }) => {
      try {
        const user = await client.user.findUnique({ where: { email } });
        if (!user) {
          return failError("존재하지 않는 유저입니다.");
        }
        const compare = await bcrypt.compare(password, user.password);
        if (!compare) {
          return failError("비밀번호가 일치하지 않습니다.");
        }
        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign({ id: user.id }, secretKey);
        return {
          ok: true,
          token
        };
      } catch (error) {
        console.log(error);
        return failError("error");
      }
    }
  }
};

export default resolvers;
