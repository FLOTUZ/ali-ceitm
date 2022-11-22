import moment from "moment";
import { Settings } from "@prisma/client";

import { Args, SettingsDTO } from "@models";
import { IGraphqlContext } from "../context";
import { isAdmin } from "graphql/resolvers";
import { AuthenticationError } from "apollo-server-core";

export const SettingsResolver = {
  Query: {
    allSettings: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      const settings = await prisma.settings.findMany();

      const aliment = settings.find(
        (setting) => setting.nombre === "alimento"
      )?.valor;

      const changeHour = settings.find(
        (setting) => setting.nombre === "hora_cambio"
      )?.valor;

      const currentTime = moment().utc();
      //Time string to moment
      const changeTimeMoment = moment(changeHour, "HH:mm").utc();

      //Compare hora actual with hora cambio to get the current turn
      const currentTurn = moment(currentTime).isAfter(changeTimeMoment)
        ? "COMIDA"
        : "DESAYUNO";

      if (aliment !== currentTurn) {
        //Update alimento to current turn
        await prisma.settings.update({
          where: {
            nombre: "alimento",
          },
          data: {
            valor: currentTurn,
          },
        });
      }

      // get week number on year
      const currenWeekNumber = moment().week();
      
      //get previusly week number saved on db
      const previouslyWeekOnDb = settings.find(
        (setting) => setting.nombre === "num_semana"
      )?.valor;

      // get turn of cover
      const weekTurn = settings.find(
        (setting) => setting.nombre === "semana"
      )?.valor;

      //Check if week number is different to the one saved on db
      if (currenWeekNumber > Number(previouslyWeekOnDb)) {
        //Update numSemana to current week
        await prisma.settings.update({
          where: {
            nombre: "num_semana",
          },
          data: {
            valor: currenWeekNumber.toString(),
          },
        });

        if (weekTurn === "PAR") {
          //Update turnoSemana to IMPAR
          await prisma.settings.update({
            where: {
              nombre: "semana",
            },
            data: {
              valor: "NON",
            },
          });
        } else {
          //Update turnoSemana to PAR
          await prisma.settings.update({
            where: {
              nombre: "semana",
            },
            data: {
              valor: "PAR",
            },
          });
        }
      }

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

    updateManySettings: async (
      _: any,
      { data }: { data: SettingsDTO[] },
      { prisma, role }: IGraphqlContext
    ) => {
      if (isAdmin(role!) === false) {
        throw new AuthenticationError(
          "No tienes permisos para realizar esta acción"
        );
      }
      data.map(async (item) => {
        await prisma.settings.update({
          where: { nombre: item.nombre },
          data: {
            valor: item.valor,
          },
        });
      });
      return await prisma.settings.findMany();
    },
  },
};
