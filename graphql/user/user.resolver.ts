import { prisma } from "@services";
import { User } from "@prisma/client";
import { Args } from "graphql/models";
import { UserDto } from "./user.dto";

export const UserResolver = {
  Query: {
    allUsers: async (_: any, { pagination }: Args) => {
      return await prisma.user.findMany({
        ...pagination,
      });
    },
    userById:async (_: any, { id }: User) => {
      return await prisma.user.findUnique({
        where: {
          id,
        },
      });
    },
  },

  Mutation: {
    createUser: async (_: any, { data }: { data: UserDto }) => {
      return await prisma.user.create({
        data,
      });
    },

    updateUser: async (_: any, { id, ...data }: User) => {
      const response = await prisma.user.update({
        where: { id },
        data,
      });

      return response;
    },

    deleteUser: async (_: any, { id }: User) => {
      const response = await prisma.user.delete({
        where: { id },
      });

      return response;
    },
  },
};
