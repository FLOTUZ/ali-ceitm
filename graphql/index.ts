import jwt from "jsonwebtoken";
import path from "path";
import { ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import { makeExecutableSchema } from "@graphql-tools/schema";
import { prisma } from "services/prisma.service";

import { mergeTypeDefs } from "@graphql-tools/merge";

import { NextApiRequest, NextApiResponse } from "next";
import { IPayload, valiteAndRefreshToken } from "./context";

import {
  UserResolver,
  RoleResolver,
  BecaResolver,
  BecarioResolver,
  CafeteriaResolver,
  CobroResolver,
  ImagenResolver,
  PersonaResolver,
  ProblemaResolver,
  CarreraResolver,
  SettingsResolver,
} from "./resolvers";
import {
  BecaSchema,
  BecarioSchema,
  CafeteriaSchema,
  CarreraSchema,
  CobroSchema,
  InputSchema,
  ScalarsSchema,
  ImagenSchema,
  PersonaSchema,
  ProblemaSchema,
  RoleSchema,
  SettingsSchema,
  UserSchema,
} from "./schemas";

const context = ({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  const payload = valiteAndRefreshToken(req, res) as IPayload;

  if (payload == null) {
    return { prisma, idUser: null, role: null };
  }

  if (payload.role == undefined) {
    return { prisma, idUser: payload.id, role: null };
  }
  return {
    prisma,
    idUser: payload.id,
    role: payload.role,
  };
};

const typeDefs = mergeTypeDefs([
  BecaSchema,
  BecarioSchema,
  CafeteriaSchema,
  CarreraSchema,
  CobroSchema,
  InputSchema,
  ScalarsSchema,
  ImagenSchema,
  PersonaSchema,
  ProblemaSchema,
  RoleSchema,
  SettingsSchema,
  UserSchema,
]);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: [
    UserResolver,
    RoleResolver,
    BecaResolver,
    BecarioResolver,
    CafeteriaResolver,
    CobroResolver,
    ImagenResolver,
    PersonaResolver,
    ProblemaResolver,
    CarreraResolver,
    SettingsResolver,
  ],
});

export const apolloServer = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  introspection: process.env.NODE_ENV !== "production",
  context: context,
});

export const startServer = apolloServer.start();
