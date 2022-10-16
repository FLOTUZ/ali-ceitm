import { prisma } from "@services";
import { Imagen } from "@prisma/client";

import { Args, ImagenDTO } from "@models";

export const ImagenResolver = {
  Query: {
    allImagenes: async (_: any, { pagination }: Args) => {
      return await prisma.imagen.findMany({
        ...pagination,
      });
    },
    imagenById: async (_: any, { id }: Imagen) => {
      return await prisma.imagen.findUnique({
        where: {
          id,
        },
      });
    },
  },
  Mutation: {
    createImagen: async (_: any, { data }: { data: ImagenDTO }) => {
      return await prisma.imagen.create({
        data,
      });
    },
    updateImagen: async (_: any, { id, ...data }: Imagen) => {
      const response = await prisma.imagen.update({
        where: { id },
        data,
      });
      return response;
    },
    deleteImagen: async (_: any, { id }: Imagen) => {
      const response = await prisma.imagen.delete({
        where: { id },
      });
      return response;
    },
  },
};
