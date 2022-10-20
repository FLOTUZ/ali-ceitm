import { Settings } from "@prisma/client";

import { Args, SettingsDTO } from "@models";
import { IGraphqlContext } from "graphql";

export const SettingsResolver = {
  Query: {
    allSettings: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.settings.findMany({
        ...pagination,
      });
    },
    settingById: async (
      _: any,
      { id }: Settings,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.settings.findUnique({
        where: {
          id,
        },
      });
    },
    settingByNombre: async (
      _: any,
      { nombre }: Settings,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.settings.findUnique({
        where: {
          nombre,
        },
      });
    },
  },
  Mutation: {
    createSetting: async (
      _: any,
      { data }: { data: SettingsDTO },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.settings.create({
        data,
      });
    },
    updateSetting: async (
      _: any,
      { id, ...data }: Settings,
      { prisma }: IGraphqlContext
    ) => {
      const response = await prisma.settings.update({
        where: { id },
        data,
      });
      return response;
    },
    deleteSetting: async (
      _: any,
      { id }: Settings,
      { prisma }: IGraphqlContext
    ) => {
      const response = await prisma.settings.delete({
        where: { id },
      });
      return response;
    },
  },
};
