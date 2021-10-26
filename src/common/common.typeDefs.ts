import { gql } from "apollo-server-core";

export default gql`
  type MutationOutput {
    ok: Boolean!
    error: String
  }
`;
