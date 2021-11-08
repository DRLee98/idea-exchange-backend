import * as jwt from "jsonwebtoken";
import client from "../client";
import { failError } from "../common/common.utils";
import { Context, Resolver } from "../types";

export const getUser = async (token: string) => {
  if (token) {
    const secretKey = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secretKey);
    if (typeof decoded === "object" && decoded.id) {
      const user = await client.user.findUnique({ where: { id: decoded.id } });
      return user ? user : null;
    }
    return null;
  }
  return null;
};

export const privateResolver =
  (resolver: Resolver) =>
  (parent: any, args: any, context: Context, info: any) => {
    if (context.loggedInUser) {
      return resolver(parent, args, context, info);
    } else if (info.operation.operation === "query") {
      return null;
    }
    return failError("로그인을 한 후에 이용 부탁드립니다.");
  };
