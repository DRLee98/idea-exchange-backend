import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: Int!
    email: String!
    name: String!
    tel: Int!
    profileUrl: String
    permissionLevel: Int
    followers: [User!]
    following: [User!]
  }

  type Verification {
    id: Int!
    tel: Int
    email: String
    code: String
    verified: Boolean!
  }
`;
