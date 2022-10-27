import { PersonaDTO } from "graphql/persona/persona.dto";
import { UserDto } from "graphql/user/user.dto";
import { axiosClient } from "services/axios-client.service";

export const createUsuario = async (user: UserDto, persona: PersonaDTO) => {
  return await axiosClient().post("/auth/signup", { user, persona });
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
