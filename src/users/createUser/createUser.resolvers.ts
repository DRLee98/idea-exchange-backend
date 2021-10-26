import * as bcrypt from "bcrypt";
import client from "../../client";
import { mutationError } from "../../common/common.utils";
import { Resolvers } from "../../types";
import uploader from "../../upload/upload.utils";

const resolvers: Resolvers = {
  Mutation: {
    createUser: async (_, { email, name, password, tel, profile }) => {
      try {
        const existEmail = await client.user.count({ where: { email } });
        if (existEmail) {
          return mutationError("이미 사용중인 이메일 입니다.");
        }
        const existTel = await client.user.count({ where: { tel } });
        if (existTel) {
          return mutationError("이미 사용중인 번호 입니다.");
        }
        const telVerified = await client.verification.findUnique({
          where: { tel },
          select: { verified }
        });
        if (!telVerified) {
          return mutationError("휴대폰 인증을 완료해 주시기 바랍니다.");
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const profileUrl = await uploader(profile);
        await client.user.create({
          data: {
            email,
            name,
            password: hashPassword,
            tel,
            profileUrl
          }
        });
        return {
          ok: true
        };
      } catch (error) {
        return mutationError(error);
      }
    }
  }
};

export default resolvers;
