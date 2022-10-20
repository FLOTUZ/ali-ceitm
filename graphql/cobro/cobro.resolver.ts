import { Cobro } from "@prisma/client";
import { Args, CobroDTO } from "@models";
import { IGraphqlContext } from "graphql";

export const CobroResolver = {
  Query: {
    allCobros: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.cobro.findMany({
        ...pagination,
      });
    },
    cobroById: async (_: any, { id }: Cobro, { prisma }: IGraphqlContext) => {
      return await prisma.cobro.findUnique({
        where: {
          id,
        },
      });
    },
  },
  Mutation: {
    createCobro: async (
      _: any,
      { data }: { data: CobroDTO },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.cobro.create({
        data,
      });
    },
    updateCobro: async (
      _: any,
      { id, ...data }: Cobro,
      { prisma }: IGraphqlContext
    ) => {
      const response = await prisma.cobro.update({
        where: { id },
        data,
      });
      return response;
    },
    deleteCobro: async (_: any, { id }: Cobro, { prisma }: IGraphqlContext) => {
      const response = await prisma.cobro.delete({
        where: { id },
      });
      return response;
    },
  },
};
