import { Args } from "@models";
import { Cobro } from "@prisma/client";
import { IGraphqlContext } from "graphql";
import { sha256 } from "crypto-hash";
import { ForbiddenError } from "apollo-server-micro";

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
    createCobro: async (
      _: any,
      __: any,
      { prisma, idUser, role }: IGraphqlContext
    ) => {
      // IF ROLE OF USER IS CASHIER
      if (role === "CAJERO" || role === null) {
        throw new ForbiddenError(
          "No tienes permisos para generar codigos de cobro"
        );
      }

      if (role === "ADMIN" || role === "BECARIO") {
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

          // -----------------  CHECK IF BECARIO IS BLOQUED -----------------
          if (becario?.puede_cobrar) {
            //------------------ CALCULATE BECARIO STATUS  ------------------//
            // GET FORCED COBROS OF BECARIO
            const forcedCobros = await prisma.cobro.findMany({
              where: {
                becarioId: becario!.id,
                was_forced: true,
              },
            });

            // COUNT OF FORCED COBROS
            const forcedCobrosCount = forcedCobros.length;

            // IF BECARIO HAS DETERMINATE STRIKES
            const strikes = await prisma.settings.findUnique({
              where: {
                nombre: "strikes",
              },
            });

            const strikesCount = parseInt(strikes!.valor);

            if (forcedCobrosCount >= strikesCount) {
              // ------------------ BLOCK BECARIO ------------------ //
              await prisma.becario.update({
                where: {
                  id: becario!.id,
                },
                data: {
                  puede_cobrar: false,
                },
              });

              throw new ForbiddenError("FORCED_LIMIT_COBROS_EXCEEDED");
            }
          } else {
            throw new ForbiddenError(
              "BLOQUED_BY_SYSTEM Haz alcanzado el limite de cobros no usados"
            );
          }

          // ------------------ GENERATE COBRO CODE ------------------ //
          if (becario?.puede_cobrar) {
            //Generate short hash
            const hash = await sha256(`${persona.n_control} ${Date.now()}`);
            const shortHash = hash.slice(0, 5);
            // IF BECARIO IS FOUND GENERATE COBRO CODE
            const generatedCobro = await prisma.cobro.create({
              data: {
                becarioId: becario!.id,
                concepto: "Beca alimenticia",
                codigo_cobro: shortHash,
                fecha_cobro: new Date().toISOString(),
              },
            });

            return generatedCobro;
          }
        }
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
            codigo_usado: true,
            forma_cobro: `FORZADO POR ${role} ${persona?.nombres}`,
            was_forced: true,
            cafeteriaId: null,
          },
        });
        return cobro;
      } else {
        throw new ForbiddenError("No tienes permisos para forzar cobros");
      }
    },
  },
};
