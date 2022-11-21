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

      const semana = settings.find(
        (setting) => setting.nombre === "semana"
      )?.valor;

      const alimento = settings.find(
        (setting) => setting.nombre === "alimento"
      )?.valor;

      const horaCambio = settings.find(
        (setting) => setting.nombre === "hora_cambio"
      )?.valor;

      const horaActual = moment().utc();
      //Time string to moment
      const horaCambioMoment = moment(horaCambio, "HH:mm").utc();

      //Compare hora actual with hora cambio to get the current turn
      const currentTurn = moment(horaActual).isAfter(horaCambioMoment)
        ? "COMIDA"
        : "DESAYUNO";

      if (alimento !== currentTurn) {
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
