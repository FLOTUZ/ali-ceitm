import { gql } from "apollo-server-core";

export const BecarioSchema = gql`
  input CreateBecatioInput {
    personaId: Int!
    turno: String!
    semana_cobro: String!
    en_lista_espera: Boolean!
    puede_cobrar: Boolean!
    becaId: Int!
  }

  input UpdateBecarioInput{
    personaId: Int
    turno: String
    semana_cobro: String
    en_lista_espera: Boolean
    puede_cobrar: Boolean
    becaId: Int
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
    persona: Persona
    beca: Beca
  }

 
  type Query {
    allBecarios(pagination: Pagination): [Becario]
    allBecariosWithRelations(pagination: Pagination): [Becario]
    becarioById(id: Int!): Becario
    becarioByIdWithRelations(id: Int!): Becario
  }

  type Mutation {
    createBecario(data: CreateBecatioInput!): Becario
    updateBecario(id: Int!, data: UpdateBecarioInput!): Becario
    deleteBecario(id: Int!): Becario
  }
`;
