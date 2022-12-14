import { Persona } from "@prisma/client";

import { Args, PersonaDTO } from "@models";
import { IGraphqlContext } from "../context";

export const PersonaResolver = {
  Query: {
    allPersonas: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.persona.findMany({
        ...pagination,
      });
    },
    personaById: async (
      _: any,
      { id }: Persona,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.persona.findUnique({
        where: {
          id,
        },
      });
    },

    currentPersona: async (
      _: any,
      __: any,
      { prisma, idUser }: IGraphqlContext
    ) => {
      return await prisma.persona.findUnique({
        where: {
          userId: idUser!,
        },
      });
    },
    personasByBeca: async (
      _: any,
      { id }: Persona,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.persona.findMany({
        where: {
          becarios: {
            some: {
              becaId: id,
            },
          },
        },
        include: {
          becarios: true,
        },
      });
    },
  },
  Mutation: {
    createPersona: async (
      _: any,
      { data }: { data: PersonaDTO },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.persona.create({
        data,
      });
    },
    updatePersona: async (
      _: any,
      { id, data }: { id: number; data: Persona },
      { prisma }: IGraphqlContext
    ) => {
      const response = await prisma.persona.update({
        where: { id },
        data: data,
      });
      return response;
    },
    deletePersona: async (
      _: any,
      { id }: Persona,
      { prisma }: IGraphqlContext
    ) => {
      const response = await prisma.persona.delete({
        where: { id },
      });
      return response;
    },
  },
};
