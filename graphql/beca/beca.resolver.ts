import { Beca } from "@prisma/client";

import { Args, BecaDTO } from "@models";
import { IGraphqlContext } from "graphql";

export const BecaResolver = {
  Query: {
    allBecas: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.beca.findMany({
        ...pagination,
      });
    },
    becaById: async (_: any, { id }: Beca, { prisma }: IGraphqlContext) => {
      return await prisma.beca.findUnique({
        where: {
          id,
        },
      });
    },
  },
  Mutation: {
    createBeca: async (
      _: any,
      { data }: { data: BecaDTO },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.beca.create({
        data,
      });
    },
    updateBeca: async (
      _: any,
      { id, ...data }: Beca,
      { prisma }: IGraphqlContext
    ) => {
      const response = await prisma.beca.update({
        where: { id },
        data,
      });
      return response;
    },
    deleteBeca: async (_: any, { id }: Beca, { prisma }: IGraphqlContext) => {
      const response = await prisma.beca.delete({
        where: { id },
      });
      return response;
    },
  },
};
