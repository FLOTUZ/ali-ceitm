import { Imagen } from "@prisma/client";

import { Args, ImagenDTO } from "@models";
import { IGraphqlContext } from "graphql";

export const ImagenResolver = {
  Query: {
    allImagenes: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.imagen.findMany({
        ...pagination,
      });
    },
    imagenById: async (_: any, { id }: Imagen, { prisma }: IGraphqlContext) => {
      return await prisma.imagen.findUnique({
        where: {
          id,
        },
      });
    },
  },
  Mutation: {
    createImagen: async (
      _: any,
      { data }: { data: ImagenDTO },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.imagen.create({
        data,
      });
    },
    updateImagen: async (
      _: any,
      { id, ...data }: Imagen,
      { prisma }: IGraphqlContext
    ) => {
      const response = await prisma.imagen.update({
        where: { id },
        data,
      });
      return response;
    },
    deleteImagen: async (
      _: any,
      { id }: Imagen,
      { prisma }: IGraphqlContext
    ) => {
      const response = await prisma.imagen.delete({
        where: { id },
      });
      return response;
    },
  },
};
