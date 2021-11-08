import { Resolvers } from "../../types";
import { privateResolver } from "../users.utils";

const resolvers: Resolvers = {
  Query: {
    seeMe: privateResolver(async (_, __, { client, loggedInUser }) =>
      client.user.findUnique({ where: { id: loggedInUser.id } })
    )
  }
};

export default resolvers;
