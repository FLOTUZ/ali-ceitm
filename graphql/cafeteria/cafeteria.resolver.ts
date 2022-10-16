import { prisma } from "@services";
import { Cafeteria } from "@prisma/client";

import { Args, CafeteriaDTO } from "@models";

export const CafeteriaResolver = {
  Query: {
    allCafeterias: async (_: any, { pagination }: Args) => {
      return await prisma.cafeteria.findMany({
        ...pagination,
      });
    },
    cafeteriaById: async (_: any, { id }: Cafeteria) => {
      return await prisma.cafeteria.findUnique({
        where: {
          id,
        },
      });
    },
  },
  Mutation: {
    createCafeteria: async (_: any, { data }: { data: CafeteriaDTO }) => {
      return await prisma.cafeteria.create({
        data,
      });
    },
    updateCafeteria: async (_: any, { id, ...data }: Cafeteria) => {
      const response = await prisma.cafeteria.update({
        where: { id },
        data,
      });
      return response;
    },
    deleteCafeteria: async (_: any, { id }: Cafeteria) => {
      const response = await prisma.cafeteria.delete({
        where: { id },
      });
      return response;
    },
  },
};
