import { Persona } from "@prisma/client";

import { Args, RoleDTO } from "@models";
import { IGraphqlContext } from "graphql";

export const RoleResolver = {
  Query: {
    allRoles: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.role.findMany({
        ...pagination,
      });
    },
    roleById: async (_: any, { id }: Persona, { prisma }: IGraphqlContext) => {
      return await prisma.role.findUnique({
        where: {
          id,
        },
      });
    },
  },
  Mutation: {
    createRole: async (
      _: any,
      { data }: { data: RoleDTO },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.role.create({
        data,
      });
    },
    updateRole: async (
      _: any,
      { id, ...data }: Persona,
      { prisma }: IGraphqlContext
    ) => {
      const response = await prisma.role.update({
        where: { id },
        data,
      });
      return response;
    },
    deleteRole: async (
      _: any,
      { id }: Persona,
      { prisma }: IGraphqlContext
    ) => {
      const response = await prisma.role.delete({
        where: { id },
      });
      return response;
    },
  },
};
