import { Cobro } from "@prisma/client";
import { Args, CobroDTO } from "@models";
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
    createCobro: async (_: any, { prisma, idUser }: IGraphqlContext) => {
      const persona = await prisma.persona.findUnique({
        where: {
          userId: idUser,
        },
      });

      if (persona) {
        const becario = await prisma.becario.findUnique({
          where: {
            personaId: persona.id,
          },
        });

        const generatedCobro = await prisma.cobro.create({
          data: {
            becarioId: becario!.id,
            concepto: "Beca alimenticia",
            codigo_cobro: "123456789",
            forma_cobro: "CAJA",
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
      { id }: Cobro,
      { prisma, role, idUser }: IGraphqlContext
    ) => {

      if (role === "CAFETERIA") {

        const persona = await prisma.persona.findUnique({
          where: {
            userId: idUser,
          },
        });

        const cobro = await prisma.cobro.update({
          where: { id },
          data: {
            codigo_usado: true,
            cafeteriaId: persona!.cafeteriaId,
          },
        });

        return cobro;
      }

      //if role is admin, concejal or cashier
      if (role === "ADMIN" || role === "CONCEJAL") {
        const cobro = await prisma.cobro.update({
          where: { id },
          data: {
            codigo_usado: true,
          },
        });
        return cobro;
      } else {
        throw new Error("No tienes permisos para realizar esta acción");
      }
    },
  },
};
