import { gql } from "apollo-server-core";

export const InputSchema = gql`
  input Pagination {
    take: Int
    skip: Int
  }
`;
