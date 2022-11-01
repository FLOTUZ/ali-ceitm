import { gql } from "apollo-server-core";

export const CafeteriaSchema = gql`
  input CreateCafeteriaInput {
    nombre: String!
    direccion: String
    campus: String!
  }

  type Cafeteria {
    id: Int
    nombre: String
    direccion: String
    campus: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Query {
    allCafeterias(pagination: Pagination): [Cafeteria]
    cafeteriaById(id: Int!): Cafeteria
  }

  type Mutation {
    createCafeteria(data: CreateCafeteriaInput!): Cafeteria
    updateCafeteria(id: Int!, data: CreateCafeteriaInput!): Cafeteria
    deleteCafeteria(id: Int!): Cafeteria
  }
`;
