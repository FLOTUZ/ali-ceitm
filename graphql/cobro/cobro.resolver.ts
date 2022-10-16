import { prisma } from "@services";
import { Cobro } from "@prisma/client";
import { Args, CobroDTO } from "@models";

export const CobroResolver = {
  Query: {
    allCobros: async (_: any, { pagination }: Args) => {
      return await prisma.cobro.findMany({
        ...pagination,
      });
    },
    cobroById: async (_: any, { id }: Cobro) => {
      return await prisma.cobro.findUnique({
        where: {
          id,
        },
      });
    },
  },
  Mutation: {
    createCobro: async (_: any, { data }: { data: CobroDTO }) => {
      return await prisma.cobro.create({
        data,
      });
    },
    updateCobro: async (_: any, { id, ...data }: Cobro) => {
      const response = await prisma.cobro.update({
        where: { id },
        data,
      });
      return response;
    },
    deleteCobro: async (_: any, { id }: Cobro) => {
      const response = await prisma.cobro.delete({
        where: { id },
      });
      return response;
    },
  },
};
