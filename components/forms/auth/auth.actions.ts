import { gql } from "@apollo/client";

export const GET_CARRERAS_ACTION = gql`
  query GetCarreras {
    allCarreras {
      id
      nombre
    }
  }
`;

export const REGISTRO_USUARIO_ACTION = gql`
  mutation CREATE_USER(
    # ==== User data ====
    $username: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      data: {
        username: $username
        email: $email
        password: $password
        roleId: 2
      }
    ) {
      id
      username
      email
    }
  }
`;

export const REGISTRO_PERSONA_ACTION = gql`
  mutation CREATE_PERSONA(
    # ==== Persona data ====
    $nombres: String!
    $a_paterno: String!
    $a_materno: String!
    $n_control: String!
    $email_institucional: String!
    $campus: Int!
    $telefono: String!
    $whatsapp: String!
    $carreraId: Int!
    $userId: Int!
  ) {
    createPersona(
      data: {
        nombres: $nombres
        a_paterno: $a_paterno
        a_materno: $a_materno
        n_control: $n_control
        email_institucional: $email_institucional
        campus: $campus
        whatsapp: $whatsapp
        carreraId: $carreraId
        telefono: $telefono
        userId: $userId
      }
    ) {
      id
      nombres
      a_paterno
      a_materno
      email_institucional
      campus
      whatsapp
      telefono
    }
  }
`;
