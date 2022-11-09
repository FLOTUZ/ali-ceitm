import { gql } from "apollo-server-core";

export const BecaSchema = gql`
  input CreateBecaInput {
    nombre: String!
    inicia: DateTime!
    termina: DateTime
    descripcion: String!
    is_active: Boolean
  }

  input UpdateBecaInput {
    nombre: String
    inicia: DateTime
    termina: DateTime
    descripcion: String
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
    becarios: [Becario]
  }

  type Query {
    allBecas(pagination: Pagination): [Beca]
    becaById(id: Int!): Beca
  }

  type Mutation {
    createBeca(data: CreateBecaInput!): Beca
    updateBeca(id: Int!, data: UpdateBecaInput!): Beca
    deleteBeca(id: Int!): Beca
  }
`;
