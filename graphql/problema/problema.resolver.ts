import { prisma } from "@services";
import { Problema } from "@prisma/client";

import { Args, ProblemaDTO } from "@models";

export const ProblemaResolver = {
  Query: {
    allProblemas: async (_: any, { pagination }: Args) => {
      return await prisma.problema.findMany({
        ...pagination,
      });
    },
    problemaById: async (_: any, { id }: Problema) => {
      return await prisma.problema.findUnique({
        where: {
          id,
        },
      });
    },
  },
  Mutation: {
    createProblema: async (_: any, { data }: { data: ProblemaDTO }) => {
      return await prisma.problema.create({
        data,
      });
    },
    updateProblema: async (_: any, { id, ...data }: Problema) => {
      const response = await prisma.problema.update({
        where: { id },
        data,
      });
      return response;
    },
    deleteProblema: async (_: any, { id }: Problema) => {
      const response = await prisma.problema.delete({
        where: { id },
      });
      return response;
    },
  },
};
