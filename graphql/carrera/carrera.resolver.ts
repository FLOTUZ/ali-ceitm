import { Carrera } from "@prisma/client";

import { Args, CarreraDto } from "@models";
import { IGraphqlContext } from "../context";

export const CarreraResolver = {
  Query: {
    allCarreras: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.carrera.findMany({
        ...pagination,
      });
    },
    carreraById: async (
      _: any,
      { id }: Carrera,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.carrera.findUnique({
        where: {
          id,
        },
      });
    },
  },
  Mutation: {
    createCarrera: async (
      _: any,
      { data }: { data: CarreraDto },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.carrera.create({
        data,
      });
    },
    updateCarrera: async (
      _: any,
      { id, ...data }: Carrera,
      { prisma }: IGraphqlContext
    ) => {
      const response = await prisma.carrera.update({
        where: { id },
        data,
      });
      return response;
    },
    deleteCarrera: async (
      _: any,
      { id }: Carrera,
      { prisma }: IGraphqlContext
    ) => {
      const response = await prisma.carrera.delete({
        where: { id },
      });
      return response;
    },
  },
};
