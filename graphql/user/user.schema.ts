import { gql } from "apollo-server-core";

export const UserSchema = gql`
  input CreateUserInput {
    email: String!
    password: String!
    roleId: Int
  }

  type User {
    id: Int!
    email: String!
    roleId: Int
    is_active: Boolean!
    is_deleted: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    allUsers(pagination: Pagination): [User]
    userById(id: Int!): User
    currentUser: User
  }

  type Mutation {
    createUser(data: CreateUserInput): User
    updateUser(id: Int!, name: String!): User
    deleteUser(id: Int!): User
  }
`;
