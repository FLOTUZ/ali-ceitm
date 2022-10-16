import { prisma } from "@services";
import { Becario } from "@prisma/client";

import { Args, BecarioDTO } from "@models";

export const BecarioResolver = {
  Query: {
    allBecarios: async (_: any, { pagination }: Args) => {
      return await prisma.becario.findMany({
        ...pagination,
      });
    },
    becarioById: async (_: any, { id }: Becario) => {
      return await prisma.becario.findUnique({
        where: {
          id,
        },
      });
    },
  },
  Mutation: {
    createBecario: async (_: any, { data }: { data: BecarioDTO }) => {
      return await prisma.becario.create({
        data,
      });
    },
    updateBecario: async (_: any, { id, ...data }: Becario) => {
      const response = await prisma.becario.update({
        where: { id },
        data,
      });
      return response;
    },
    deleteBecario: async (_: any, { id }: Becario) => {
      const response = await prisma.becario.delete({
        where: { id },
      });
      return response;
    },
  },
};
