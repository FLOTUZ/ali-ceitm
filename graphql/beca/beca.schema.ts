import { gql } from "apollo-server-core";

export const BecaSchema = gql`
  input CreateBecaInput {
    nombre: String!
    inicia: DateTime!
    termina: DateTime
    descripcion: String!
    is_active: Boolean
  }

  type Beca {
    id: Int
    nombre: String
    inicia: DateTime
    termina: DateTime
    descripcion: String
    is_active: Boolean
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Query {
    allBecas(pagination: Pagination): [Beca]
    becaById(id: Int!): Beca
  }

  type Mutation {
    createBeca(data: CreateBecaInput!): Beca
    updateBeca(id: Int!, data: CreateBecaInput!): Beca
    deleteBeca(id: Int!): Beca
  }
`;