import { prisma } from "@services";
import { Settings } from "@prisma/client";

import { Args, SettingsDTO } from "@models";

export const SettingsResolver = {
  Query: {
    allSettings: async (_: any, { pagination }: Args) => {
      return await prisma.settings.findMany({
        ...pagination,
      });
    },
    settingsById: async (_: any, { id }: Settings) => {
      return await prisma.settings.findUnique({
        where: {
          id,
        },
      });
    },
  },
  Mutation: {
    createSettings: async (_: any, { data }: { data: SettingsDTO }) => {
      return await prisma.settings.create({
        data,
      });
    },
    updateSettings: async (_: any, { id, ...data }: Settings) => {
      const response = await prisma.settings.update({
        where: { id },
        data,
      });
      return response;
    },
    deleteSettings: async (_: any, { id }: Settings) => {
      const response = await prisma.settings.delete({
        where: { id },
      });
      return response;
    },
  },
};
