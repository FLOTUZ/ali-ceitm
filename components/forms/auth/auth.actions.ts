import { gql } from "@apollo/client";
import { UserDto } from "graphql/user/user.dto";
import { axiosClient } from "services/axios-client.service";

export const GET_CARRERAS_ACTION = gql`
  query GetCarreras {
    allCarreras {
      id
      nombre
    }
  }
`;

export const createUsuario = async (user: UserDto) => {
  return await axiosClient().post("/auth/signup", user);
};

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

export const loginAction = async (email: string, password: string) => {
  return await axiosClient().post("/auth/login", {
    email,
    password,
  });
};

export const healthAction = async () => {
  return await axiosClient().get("/health");
};