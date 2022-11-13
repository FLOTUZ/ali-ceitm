import { gql } from "apollo-server-core";

export const SettingsSchema = gql`
  input CreateSettingsInput {
    nombre: String!
    valor: String!
  }

  type Settings {
    id: Int
    nombre: String!
    tipo_dato: String
    valor: String!
    createdAt: DateTime!
    updatedAt: DateTime
  }

  type Query {
    allSettings: [Settings]
    settingById(id: Int): Settings
    settingByNombre(nombre: String!): Settings
  }

  type Mutation {
    createSetting(data: CreateSettingsInput): Settings
    updateSetting(id: Int, data: CreateSettingsInput): Settings
    deleteSetting(id: Int): Settings
    updateManySettings(data: [CreateSettingsInput]!): [Settings]
  }
`;
