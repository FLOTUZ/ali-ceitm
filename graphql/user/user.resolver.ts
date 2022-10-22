import { User } from "@prisma/client";
import { IGraphqlContext } from "graphql";
import { Args } from "graphql/models";
import { UserDto } from "./user.dto";

export const UserResolver = {
  Query: {
    allUsers: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.user.findMany({
        ...pagination,
      });
    },
    userById: async (_: any, { id }: User, { prisma }: IGraphqlContext) => {
      return await prisma.user.findUnique({
        where: {
          id,
        },
      });
    },

    currentUser: async (
      _: any,
      __: User,
      { prisma, idUser }: IGraphqlContext
    ) => {
      const user = await prisma.user.findUnique({
        where: {
          id: idUser!,
        },
      });

      return user;
    },
  },

  Mutation: {
    createUser: async (
      _: any,
      { data }: { data: UserDto },

      { prisma }: IGraphqlContext
    ) => {
      return await prisma.user.create({
        data,
      });
    },

    updateUser: async (
      _: any,
      { id, ...data }: User,
      { prisma }: IGraphqlContext
    ) => {
      const response = await prisma.user.update({
        where: { id },
        data,
      });

      return response;
    },

    deleteUser: async (_: any, { id }: User, { prisma }: IGraphqlContext) => {
      const response = await prisma.user.delete({
        where: { id },
      });

      return response;
    },
  },
};
