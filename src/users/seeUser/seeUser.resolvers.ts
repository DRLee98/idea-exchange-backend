import client from "../../client";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeUser: async (_, { id }) => client.user.findUnique({ where: { id } }),
  },
};

export default resolvers;
