import { prisma } from "@services";
import { Imagen } from "@prisma/client";

import { Args, ImagenDTO } from "@models";

export const ImagenResolver = {
  Query: {
    allImagenes: (_: any, { pagination }: Args) => {
      return prisma.imagen.findMany({
        ...pagination,
      });
    },
    imagenById: (_: any, { id }: Imagen) => {
      return prisma.imagen.findUnique({
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
