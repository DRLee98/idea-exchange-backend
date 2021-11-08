import { gql } from "apollo-server-core";

export default gql`
  type LoginOutput {
    ok: Boolean!
    error: String
    token: String
  }

  type Query {
    login(email: String!, password: String!): LoginOutput!
  }
`;
