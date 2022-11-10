import { AuthenticationError } from "apollo-server-core";

export const isUserAutenticated = (idUser: number) => {
  if (idUser == null) {
    throw new AuthenticationError(
      "UNAUTORIZED: no se ha autenticado el usuario"
    );
  }
};

export const isAdmin = (role: string): boolean => {
  return role == "ADMIN" ? true : false;
};

export const isConcejal = (role: string): boolean => {
  return role == "CONCEJAL" ? true : false;
};

export const isBecario = (role: string): boolean => {
  return role == "BECARIO" ? true : false;
};

export const isCajero = (role: string): boolean => {
  return role == "CAJERO" ? true : false;
};
