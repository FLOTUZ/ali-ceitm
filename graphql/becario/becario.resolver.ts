import { Becario } from "@prisma/client";

import { Args, BecarioDTO } from "@models";
import { IGraphqlContext } from "../context";

export const BecarioResolver = {
  Query: {
    allBecarios: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.becario.findMany({
        ...pagination,
      });
    },
    becarioById: async (
      _: any,
      { id }: Becario,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.becario.findUnique({
        where: {
          id,
        },
      });
    },
  },
  Mutation: {
    createBecario: async (
      _: any,
      { data }: { data: BecarioDTO },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.becario.create({
        data,
      });
    },
    updateBecario: async (
      _: any,
      { id, ...data }: Becario,
      { prisma }: IGraphqlContext
    ) => {
      const response = await prisma.becario.update({
        where: { id },
        data,
      });
      return response;
    },
    deleteBecario: async (
      _: any,
      { id }: Becario,
      { prisma }: IGraphqlContext
    ) => {
      const response = await prisma.becario.delete({
        where: { id },
      });
      return response;
    },
  },
};
