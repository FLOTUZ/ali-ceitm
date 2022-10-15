import { prisma } from "@services";
import { Cobro } from "@prisma/client";
import { Args, CobroDTO } from "@models";

export const CobroResolver = {
  Query: {
    allCobros: (_: any, { pagination }: Args) => {
      return prisma.cobro.findMany({
        ...pagination,
      });
    },
    cobroById: (_: any, { id }: Cobro) => {
      return prisma.cobro.findUnique({
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
