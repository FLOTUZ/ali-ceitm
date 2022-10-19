import { Context } from "@apollo/client";
import { User } from "@prisma/client";
import { Args } from "graphql/models";
import { UserDto } from "./user.dto";

export const UserResolver = {
  Query: {
    allUsers: async (_: any, { pagination }: Args, { prisma }: Context) => {
      return await prisma.user.findMany({
        ...pagination,
      });
    },
    userById: async (_: any, { id }: User, { prisma }: Context) => {
      return await prisma.user.findUnique({
        where: {
          id,
        },
      });
    },
  },

  Mutation: {
    createUser: async (
      _: any,
      { data }: { data: UserDto },
      { prisma }: Context
    ) => {
      return await prisma.user.create({
        data,
      });
    },

    updateUser: async (_: any, { id, ...data }: User, { prisma }: Context) => {
      const response = await prisma.user.update({
        where: { id },
        data,
      });

      return response;
    },

    deleteUser: async (_: any, { id }: User, { prisma }: Context) => {
      const response = await prisma.user.delete({
        where: { id },
      });

      return response;
    },
  },
};
