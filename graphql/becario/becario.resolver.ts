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

    allBecariosWithRelations: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.becario.findMany({
        ...pagination,
        include: {
          persona: true,
          beca: true,
        },
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
    becarioByIdWithRelations: async (
      _: any,
      { id }: Becario,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.becario.findUnique({
        where: {
          id,
        },
        include: {
          persona: true,
          beca: true,
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
      { id, data }: { id: number; data: Becario },
      { prisma }: IGraphqlContext
    ) => {
      const response = await prisma.becario.update({
        where: { id },
        data: data,
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
