import { gql } from "apollo-server-core";

export const ProblemaSchema = gql`
  input CreateProblemaInput {
    titulo: String!
    descripcion: String!
  }

  type Problema {
    id: Int
    titulo: String
    descripcion: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Query {
    allProblemas(pagination: Pagination): [Problema]
    problemaById(id: Int!): Problema
  }

  type Mutation {
    createProblema(data: CreateProblemaInput!): Problema
    updateProblema(id: Int!, data: CreateProblemaInput!): Problema
    deleteProblema(id: Int!): Problema
  }
`;
