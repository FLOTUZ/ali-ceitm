import { gql } from "@apollo/client";
import { PersonaDTO } from "graphql/persona/persona.dto";
import { UserDto } from "graphql/user/user.dto";
import { axiosClient } from "services/axios-client.service";

export const GET_CARRERAS = gql`
  query GetCarreras {
    allCarreras {
      id
      nombre
    }
  }
`;

export const createUsuario = async (user: UserDto, persona: PersonaDTO) => {
  const { data } = await axiosClient().post("/auth/signup", { user, persona });
  return data;
};

export const loginAction = async (email: string, password: string) => {
  return await axiosClient().post("/auth/login", {
    email,
    password,
  });
};

export const healthAction = async () => {
  return await axiosClient().get("/health");
};
