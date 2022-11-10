import { Becario } from "@prisma/client";

import { Args, BecarioDTO } from "@models";
import { IGraphqlContext } from "../context";
import { ForbiddenError } from "apollo-server-core";
import { isUserAutenticated, isAdmin, isCajero } from "graphql/resolvers";

export const BecarioResolver = {
  Query: {
    allBecarios: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.becario.findMany({
        ...pagination,
      });
    },

    allBecariosWithRelations: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.becario.findMany({
        ...pagination,
        include: {
          persona: true,
          beca: true,
        },
      });
    },

    becarioById: async (
      _: any,
      { id }: Becario,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.becario.findUnique({
        where: {
          id,
        },
      });
    },
    becarioByIdWithRelations: async (
      _: any,
      { id }: Becario,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.becario.findUnique({
        where: {
          id,
        },
        include: {
          persona: true,
          beca: true,
        },
      });
    },
  },
  Mutation: {
    autoInscripcion: async (
      _: any,
      { becaId, turno }: { becaId: number; turno: number },
      { prisma, role, idUser }: IGraphqlContext
    ) => {
      isUserAutenticated(idUser!);

      if (isAdmin(role!) || isCajero(role!)) {
        throw new ForbiddenError("No eres un becario o concejal");
      }

      const persona = await prisma.persona.findUnique({
        where: {
          userId: idUser!,
        },
      });

      const beca = await prisma.beca.findUnique({
        where: {
          id: becaId,
        },
        include: {
          becarios: { where: { personaId: persona!.id } },
        },
      });
      //If becario exists on beca
      if (beca!.becarios.length > 0) {
        throw new Error("Ya estas inscrito en esta beca");
      }

      return await prisma.becario.create({
        data: {
          personaId: persona?.id!,
          becaId: becaId,
          turno: turno === 1 ? "DESAYUNO" : "COMIDA",
          semana_cobro: "NON",
          en_lista_espera: true,
          puede_cobrar: false,
        },
      });
    },
    createBecario: async (
      _: any,
      { data }: { data: BecarioDTO },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.becario.create({
        data,
      });
    },
    updateBecario: async (
      _: any,
      { id, data }: { id: number; data: Becario },
      { prisma }: IGraphqlContext
    ) => {
      const response = await prisma.becario.update({
        where: { id },
        data: data,
      });
      return response;
    },
    deleteBecario: async (
      _: any,
      { id }: Becario,
      { prisma }: IGraphqlContext
    ) => {
      const response = await prisma.becario.delete({
        where: { id },
      });
      return response;
    },
  },
};
