import { prisma } from "@services";
import { Settings } from "@prisma/client";

import { Args, SettingsDTO } from "@models";

export const SettingsResolver = {
  Query: {
    allSettings: (_: any, { pagination }: Args) => {
      return prisma.settings.findMany({
        ...pagination,
      });
    },
    settingsById: (_: any, { id }: Settings) => {
      return prisma.settings.findUnique({
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
