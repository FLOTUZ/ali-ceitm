import { prisma } from "@services";
import { Persona } from "@prisma/client";

import { Args, PersonaDTO } from "@models";

export const PersonaResolver = {
  Query: {
    allPersonas: (_: any, { pagination }: Args) => {
      return prisma.persona.findMany({
        ...pagination,
      });
    },
    personaById: (_: any, { id }: Persona) => {
      return prisma.persona.findUnique({
        where: {
          id,
        },
      });
    },
  },
  Mutation: {
    createPersona: async (_: any, { data }: { data: PersonaDTO }) => {
      return await prisma.persona.create({
        data,
      });
    },
    updatePersona: async (_: any, { id, ...data }: Persona) => {
      const response = await prisma.persona.update({
        where: { id },
        data,
      });
      return response;
    },
    deletePersona: async (_: any, { id }: Persona) => {
      const response = await prisma.persona.delete({
        where: { id },
      });
      return response;
    },
  },
};