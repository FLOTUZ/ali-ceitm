import { Args } from "@models";
import { Cobro } from "@prisma/client";
import { IGraphqlContext } from "graphql";

export const CobroResolver = {
  Query: {
    allCobros: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.cobro.findMany({
        ...pagination,
      });
    },
    cobroById: async (_: any, { id }: Cobro, { prisma }: IGraphqlContext) => {
      return await prisma.cobro.findUnique({
        where: {
          id,
        },
      });
    },
  },
  Mutation: {
    createCobro: async (_: any, __:any ,{ prisma, idUser, role }: IGraphqlContext) => {

      // IF ROLE OF USER IS CASHIER
      if (role === "CAJERO") {
        throw new Error("No tienes permisos para generar codigos de cobro", {
          cause: "UNAUTHORIZED",
        });
      }

      // IF ROLE IS BECARIO OR ADMIN OR CONCEJAL SEARCH USER BY ID
      const persona = await prisma.persona.findUnique({
        where: {
          userId: idUser,
        },
      });

      // IF PERSONA IS FOUND
      if (persona) {
        // GET BECARIO BY PERSONA ID
        const becario = await prisma.becario.findUnique({
          where: {
            personaId: persona.id,
          },
        });

        // IF BECARIO IS FOUND GENERATE COBRO CODE
        const generatedCobro = await prisma.cobro.create({
          data: {
            becarioId: becario!.id,
            concepto: "Beca alimenticia",
            codigo_cobro: "123456789",
            fecha_cobro: new Date().toISOString(),
          },
        });

        return generatedCobro;
      }
      return null;
    },
    updateCobro: async (
      _: any,
      { id, ...data }: Cobro,
      { prisma }: IGraphqlContext
    ) => {
      const response = await prisma.cobro.update({
        where: { id },
        data,
      });
      return response;
    },
    deleteCobro: async (_: any, { id }: Cobro, { prisma }: IGraphqlContext) => {
      const response = await prisma.cobro.delete({
        where: { id },
      });
      return response;
    },

    realizeCobro: async (
      _: any,
      id: number,
      { prisma, role, idUser }: IGraphqlContext
    ) => {
      //If the user is cashier
      if (role === "CAJERO") {
        //Find the the person for get the cafeteriaId of the cashier
        const persona = await prisma.persona.findUnique({
          where: {
            userId: idUser,
          },
        });

        //For use the cafeteriaId in the cobro
        const cobro = await prisma.cobro.update({
          where: { id },
          data: {
            codigo_usado: true,
            cafeteriaId: persona!.cafeteriaId,
          },
        });

        return cobro;
      }
      return null;
    },

    forceCobro: async (
      _: any,
      id: number,
      { prisma, role, idUser }: IGraphqlContext
    ) => {
      //if the user is admin, concejal
      if (role === "ADMIN" || role === "CONCEJAL") {
        // Search the person by userId
        const persona = await prisma.persona.findUnique({
          where: {
            userId: idUser,
          },
        });

        // Generate forced cobro for the becario
        const cobro = await prisma.cobro.update({
          where: { id },
          data: {
            forma_cobro: `FORZADO POR ${role} ${persona?.nombres}`,
            was_forced: true,
          },
        });
        return cobro;
      } else {
        throw new Error("No tienes permisos para forzar cobros", {
          cause: "UNAUTHORIZED",
        });
      }
    },
  },
};
