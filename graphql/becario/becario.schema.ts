import { gql } from "apollo-server-core";

export const BecarioSchema = gql`
  input CreateBecatioInput {
    personaId: Int!
    turno: String!
    semana_cobro: String!
    en_lista_espera: Boolean!
    puede_cobrar: Boolean!
    becaId: Boolean!
  }

  type Becario {
    id: Int
    en_lista_espera: Boolean
    puede_cobrar: Boolean
    personaId: Int
    turno: String
    semana_cobro: String
    becaId: Int
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Query {
    allBecarios(pagination: Pagination): [Becario]
    becarioById(id: Int!): Becario
  }

  type Mutation {
    createBecario(data: CreateBecatioInput!): Becario
    updateBecario(id: Int!, data: CreateBecatioInput!): Becario
    deleteBecario(id: Int!): Becario
  }
`;