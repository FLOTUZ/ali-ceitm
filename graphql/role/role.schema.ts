import { gql } from "apollo-server-core";

export const RoleSchema = gql`
input CreateRoleInput {
  rol_name: String!
  is_deleted: Boolean!
}

type Role {
  id: Int
  rol_name: String
  is_deleted: Boolean
  createdAt: DateTime
  updatedAt: DateTime
}

type Query {
  allRoles: [Role]
  roleById(id: Int!): Role
  currentRole: Role
}

type Mutation {
  createRole(data: CreateRoleInput!): Role
  updateRole(id: Int!, data: CreateRoleInput!): Role
  deleteRole(id: Int!): Role
} `;