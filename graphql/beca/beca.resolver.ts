import { prisma } from "@services";
import { Beca } from "@prisma/client";

import { Args, BecaDTO } from "@models";

export const BecaResolver = {
  Query: {
    allBecas: (_: any, { pagination }: Args) => {
      return prisma.beca.findMany({
        ...pagination,
      });
    },
    becaById: (_: any, { id }: Beca) => {
      return prisma.beca.findUnique({
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
