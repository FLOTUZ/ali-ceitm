import { prisma } from "@services";
import { Persona } from "@prisma/client";

import { Args, RoleDTO } from "@models";

export const RoleResolver = {
  Query: {
    allRoles: async (_: any, { pagination }: Args) => {
      return await prisma.role.findMany({
        ...pagination,
      });
    },
    roleById: async (_: any, { id }: Persona) => {
      return await prisma.role.findUnique({
        where: {
          id,
        },
      });
    },
  },
  Mutation: {
    createRole: async (_: any, { data }: { data: RoleDTO }) => {
      return await prisma.role.create({
        data,
      });
    },
    updateRole: async (_: any, { id, ...data }: Persona) => {
      const response = await prisma.role.update({
        where: { id },
        data,
      });
      return response;
    },
    deleteRole: async (_: any, { id }: Persona) => {
      const response = await prisma.role.delete({
        where: { id },
      });
      return response;
    },
  },
};
