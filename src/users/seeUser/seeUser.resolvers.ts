import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeUser: async (_, { id }, { client }) =>
      client.user.findUnique({ where: { id } })
  }
};

export default resolvers;
