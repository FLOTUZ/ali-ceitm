import { gql } from "apollo-server-core";

export const CobroSchema = gql`
  input CreateCobroInput {
    becarioId: Int!
    concepto: String!
    codigo_cobro: String!
    was_forced: Boolean!
    forma_cobro: String
    fecha_cobro: DateTime
    cafeteriaId: Int!
  }

  type Cobro {
    id: Int
    becarioId: Int
    concepto: String
    codigo_cobro: String
    was_forced: Boolean
    forma_cobro: String
    fecha_cobro: DateTime
    cafeteriaId: Int
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Query {
    allCobros(pagination: Pagination): [Cobro]
    cobroById(id: Int!): Cobro
    cobrosRealizados: [Cobro]
    cobrosNoRealizados: [Cobro]
    cobrosRegistradosPorCajero: [Cobro]
    generateCobroCode: Cobro
  }

  type Mutation {
    updateCobro(id: Int!, data: CreateCobroInput): Cobro
    deleteCobro(id: Int!): Boolean

    realizeCobro(codigo: String!): Cobro
    forceCobro(id: Int!): Cobro
  }
`;
