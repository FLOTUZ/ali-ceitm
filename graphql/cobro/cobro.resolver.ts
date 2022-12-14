import { Args } from "@models";
import { Cobro } from "@prisma/client";
import { IGraphqlContext } from "../context";
import { sha256 } from "crypto-hash";
import { AuthenticationError, ForbiddenError } from "apollo-server-micro";
import moment from "moment";

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

    cobrosRealizados: async (
      _: any,
      __: any,
      { prisma, idUser }: IGraphqlContext
    ) => {
      const persona = await prisma.persona.findUnique({
        where: {
          userId: idUser!,
        },
      });

      const becario = await prisma.becario.findUnique({
        where: {
          personaId: persona?.id,
        },
      });

      if (becario == null) {
        throw new ForbiddenError("NOT_FOUND - El becario no esta dado de alta");
      }

      return await prisma.cobro.findMany({
        where: {
          becarioId: becario?.id,
          codigo_usado: true,
        },
      });
    },

    cobrosNoRealizados: async (
      _: any,
      __: any,
      { prisma, idUser }: IGraphqlContext
    ) => {
      const persona = await prisma.persona.findUnique({
        where: {
          userId: idUser!,
        },
      });

      const becario = await prisma.becario.findUnique({
        where: {
          personaId: persona?.id,
        },
      });

      if (becario == null) {
        throw new ForbiddenError("NOT_FOUND - El becario no esta dado de alta");
      }

      return await prisma.cobro.findMany({
        where: {
          becarioId: becario?.id,
          codigo_usado: false,
          was_forced: false,
        },
      });
    },

    cobrosRegistradosPorCajero: async (
      _: any,
      __: any,
      { prisma, idUser }: IGraphqlContext
    ) => {
      const persona = await prisma.persona.findUnique({
        where: {
          userId: idUser!,
        },
      });

      return await prisma.cobro.findMany({
        where: {
          cafeteriaId: persona?.cafeteriaId,
        },
      });
    },

    generateCobroCode: async (
      _: any,
      __: any,
      { prisma, idUser, role }: IGraphqlContext
    ) => {
      if (role == null || idUser == null) {
        throw new AuthenticationError(
          "UNAUTORIZED el usuario no cuenta con un rol"
        );
      }

      // IF ROLE OF USER IS CASHIER
      if (role === "CAJERO") {
        throw new ForbiddenError(
          "UNAUTHORIZED No tienes permisos para generar codigos de cobro"
        );
      }

      if (role === "ADMIN" || role === "BECARIO" || role === "CONCEJAL") {
        // IF ROLE IS BECARIO OR ADMIN OR CONCEJAL SEARCH USER BY ID
        const persona = await prisma.persona.findUnique({
          where: {
            userId: idUser!,
          },
        });

        // Si la persona no tiene un becario
        if (persona == null) {
          throw new AuthenticationError("NOT_FOUND Persona no encontrada");
        }
        // GET BECARIO BY PERSONA ID
        const becario = await prisma.becario.findUnique({
          where: {
            personaId: persona!.id,
          },
        });

        // -----------------  CHECK IF BECARIO IS BLOQUED -----------------
        if (becario?.en_lista_espera) {
          throw new ForbiddenError(
            "BLOQUED_BY_SYSTEM - Estas en lista de espera, no podras cobrar hasta que un administrador te desbloquee"
          );
        }

        if (becario?.puede_cobrar == false) {
          throw new ForbiddenError(
            "BLOQUED_BY_SYSTEM - No podras cobrar hasta que un administrador te desbloquee"
          );
        }

        /**
         * Cuando el becario quiere cobrar en un turno que no le corresponde
         * el sistema retorna un error y no genera el codigo de cobro ademas
         * de no devolver el ultimo codigo de cobro generado
         */
        const turno = await prisma.settings.findUnique({
          where: {
            nombre: "alimento",
          },
        });

        const semanaCobro = await prisma.settings.findUnique({
          where: {
            nombre: "semana",
          },
        });

        //Comprueba si le toca cobrar en la semana actual
        if (
          semanaCobro?.valor != becario!.semana_cobro &&
          becario?.semana_cobro != "PAR_Y_NON"
        ) {
          throw new ForbiddenError(
            `NOT_WEEK_TURN - No es turno para cobrar becas de semana ${
              becario!.semana_cobro
            }`
          );
        }

        //Comprueba si le toca cobrar en el turno de comida actual
        if (becario?.turno != turno?.valor) {
          throw new ForbiddenError(
            `NOT_BECARIO_TURN - No es turno para cobrar ${becario!.turno}`
          );
        }

        /* 
        Si el becario tiene un cobro pendiente, y lo consulta el mismo dia
        que lo genero, se le devuelve el mismo codigo de cobro
        */
        const lastCobro = await prisma.cobro.findFirst({
          where: {
            becarioId: becario!.id,
          },
          orderBy: {
            id: "desc",
          },
        });

        // Si ha pasado menos de un dia desde el ultimo cobro
        if (lastCobro != null) {
          const lastCobroDate = moment(lastCobro.createdAt);
          const now = moment(new Date());

          const diff = now.diff(lastCobroDate, "hours");

          if (diff < 24) {
            return lastCobro;
          }
        }

        /* 
            Cuando el becario puede cobrar, el sistema debe verificar que no tenga
            mas de X cobros pendientes, o forzados.

            X: es el numero de stikes en las configuraciones del sistema

            Si tiene mas de 3 cobros pendientes, el sistema 
            debe bloquear al becario y no permitir que pueda cobrar hasta que el administrador
            lo desbloquee y tenga menos de X cobros pendientes.
             
            */
        const cobrosNoCobradosCount = await prisma.cobro.count({
          where: {
            becarioId: becario?.id,
            codigo_usado: false,
          },
        });

        // GET FORCED COBROS OF BECARIO
        const forcedCobrosCount = await prisma.cobro.count({
          where: {
            becarioId: becario!.id,
            was_forced: true,
          },
        });

        // IF BECARIO HAS DETERMINATE STRIKES
        const strikes = await prisma.settings.findUnique({
          where: {
            nombre: "strikes",
          },
        });

        /* 
          Calcula el numero de strikes de acuerdo a
          la cantidad de cobros no usados y cobros forzados
          */

        const strikesCount = parseInt(strikes!.valor);

        if (
          forcedCobrosCount >= strikesCount ||
          cobrosNoCobradosCount >= strikesCount
        ) {
          // ------------------ BLOCK BECARIO ------------------ //
          await prisma.becario.update({
            where: {
              id: becario!.id,
            },
            data: {
              puede_cobrar: false,
            },
          });

          throw new ForbiddenError(
            "STRIKES_LIMIT_COBROS_EXCEEDED - Limite de strikes alcanzado"
          );
        }

        // ------------------ GENERATE COBRO CODE ------------------ //
        if (becario?.puede_cobrar) {
          //Generate short hash
          try {
            const hash = await sha256(`${persona.n_control} ${Date.now()}`);
            const shortHash = hash.slice(0, 6);
            // IF BECARIO IS FOUND GENERATE COBRO CODE2
            const generatedCobro = await prisma.cobro.create({
              data: {
                becarioId: becario!.id,
                concepto: "Beca alimenticia",
                codigo_cobro: shortHash,
                fecha_cobro: new Date().toISOString(),
              },
            });
            return generatedCobro;
          } catch (error) {
            throw new ForbiddenError(
              "ERROR_GENERATING_COBRO_CODE - Error al generar codigo de cobro"
            );
          }
        }
      }

      return null;
    },
  },
  Mutation: {
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
      { codigo }: { codigo: string },
      { prisma, role, idUser }: IGraphqlContext
    ) => {
      //If the user is cashier
      if (role === "CAJERO") {
        //Find the the person for get the cafeteriaId of the cashier
        const persona = await prisma.persona.findUnique({
          where: {
            userId: idUser!,
          },
        });

        const cobroCode = await prisma.cobro.findFirst({
          where: {
            codigo_cobro: codigo,
          },
        });

        if (cobroCode == null) {
          throw new ForbiddenError(
            "COBRO_CODE_NOT_FOUND - Codigo no encontrado"
          );
        }

        if (cobroCode?.codigo_usado) {
          throw new ForbiddenError(
            "COBRO_ALREADY_USED - El codigo de cobro ya fue utilizado"
          );
        }

        try {
          //For use the cafeteriaId in the cobro
          const cobro = await prisma.cobro.update({
            where: { codigo_cobro: codigo },
            data: {
              codigo_usado: true,
              forma_cobro: "NORMAL",
              cafeteriaId: persona!.cafeteriaId,
            },
          });
          return cobro;
        } catch (error) {
          console.log(error);
        }
      }
      return null;
    },

    forceCobro: async (
      _: any,
      { id }: { id: number },
      { prisma, role, idUser }: IGraphqlContext
    ) => {
      //if the user is admin, concejal
      if (role === "ADMIN" || role === "CONCEJAL") {
        // Search the person by userId
        const persona = await prisma.persona.findUnique({
          where: {
            userId: idUser!,
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

        // UNBLOCK BECARIO
        await prisma.becario.update({
          where: {
            id: cobro.becarioId,
          },
          data: {
            puede_cobrar: true,
          },
        });

        return cobro;
      } else {
        throw new ForbiddenError(
          "UNAUTHORIZED - No tienes permisos para forzar cobros"
        );
      }
    },

    forceCobroWithCode: async (
      _: any,
      { code }: { code: string },
      { prisma, role, idUser }: IGraphqlContext
    ) => {
      //if the user is admin, concejal
      if (role === "ADMIN" || role === "CONCEJAL") {
        // Search the person by userId
        const persona = await prisma.persona.findUnique({
          where: {
            userId: idUser!,
          },
        });

        const codigo = await prisma.cobro.findUnique({
          where: { codigo_cobro: code },
        });

        if (codigo == null) {
          throw new ForbiddenError(
            "NOT FOUND - No se encontro el codigo de cobro"
          );
        }

        // Generate forced cobro for the becario
        const cobro = await prisma.cobro.update({
          where: { codigo_cobro: code },
          data: {
            codigo_usado: true,
            forma_cobro: `FORZADO POR ${role} ${persona?.nombres}`,
            was_forced: true,
            cafeteriaId: null,
          },
        });

        // UNBLOCK BECARIO
        await prisma.becario.update({
          where: {
            id: cobro.becarioId,
          },
          data: {
            puede_cobrar: true,
          },
        });

        return cobro;
      } else {
        throw new ForbiddenError(
          "UNAUTHORIZED - No tienes permisos para forzar cobros"
        );
      }
    },
  },
};
