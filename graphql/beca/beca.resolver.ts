import { prisma } from "@services";
import { Beca } from "@prisma/client";

import { Args, BecaDTO } from "@models";

export const BecaResolver = {
  Query: {
    allBecas: async (_: any, { pagination }: Args) => {
      return await prisma.beca.findMany({
        ...pagination,
      });
    },
    becaById: async (_: any, { id }: Beca) => {
      return await prisma.beca.findUnique({
        where: {
          id,
        },
      });
    },
  },
  Mutation: {
    createBeca: async (_: any, { data }: { data: BecaDTO }) => {
      return await prisma.beca.create({
        data,
      });
    },
    updateBeca: async (_: any, { id, ...data }: Beca) => {
      const response = await prisma.beca.update({
        where: { id },
        data,
      });
      return response;
    },
    deleteBeca: async (_: any, { id }: Beca) => {
      const response = await prisma.beca.delete({
        where: { id },
      });
      return response;
    },
  },
};
