import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createUser(
      email: String!
      name: String!
      password: String!
      tel: Int!
      profile: Upload
    ): MutationOutput!
  }
`;
