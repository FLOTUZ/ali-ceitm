import { Problema } from "@prisma/client";

import { Args, ProblemaDTO } from "@models";
import { IGraphqlContext } from "../context";

export const ProblemaResolver = {
  Query: {
    allProblemas: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.problema.findMany({
        ...pagination,
      });
    },
    problemaById: async (
      _: any,
      { id }: Problema,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.problema.findUnique({
        where: {
          id,
        },
      });
    },
  },
  Mutation: {
    createProblema: async (
      _: any,
      { data }: { data: ProblemaDTO },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.problema.create({
        data,
      });
    },
    updateProblema: async (
      _: any,
      { id, ...data }: Problema,
      { prisma }: IGraphqlContext
    ) => {
      const response = await prisma.problema.update({
        where: { id },
        data,
      });
      return response;
    },
    deleteProblema: async (
      _: any,
      { id }: Problema,
      { prisma }: IGraphqlContext
    ) => {
      const response = await prisma.problema.delete({
        where: { id },
      });
      return response;
    },
  },
};
