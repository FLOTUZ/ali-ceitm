import { gql } from "apollo-server-core";

export const PersonaSchema = gql`
  input CreatePersonaInput {
    nombres: String!
    n_control: String!
    telefono: String!
    whatsapp: String!
    email_institucional: String!
    campus: Int!
    a_paterno: String!
    a_materno: String!
    userId: Int!
    carreraId: Int!
    imagenesId: Int
    cafeteriaId: Int
  }

  input UpdatePersonaInput {
    nombres: String
    n_control: String
    telefono: String
    whatsapp: String
    email_institucional: String
    campus: Int
    a_paterno: String
    a_materno: String
    userId: Int
    carreraId: Int
    imagenesId: Int
    cafeteriaId: Int
  }

  type Persona {
    id: Int
    nombres: String
    a_paterno: String
    a_materno: String
    n_control: String
    telefono: String
    whatsapp: String
    email_institucional: String
    campus: Int
    userId: Int
    carreraId: Int
    imagenesId: Int
    cafeteriaId: Int
    createdAt: DateTime
    updatedAt: DateTime
    becarios: [Becario]
  }

  type Query {
    allPersonas(pagination: Pagination): [Persona]
    personaById(id: Int!): Persona
    currentPersona: Persona
    personasByBeca(id: Int!): [Persona]
  }

  type Mutation {
    createPersona(data: CreatePersonaInput!): Persona
    updatePersona(id: Int!, data: UpdatePersonaInput!): Persona
    deletePersona(id: Int!): Persona
  }
`;
