import { ApolloServer, AuthenticationError } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { prisma } from "services/prisma.service";
import { PrismaClient } from "@prisma/client";

import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

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

export interface IGraphqlContext {
  prisma: PrismaClient;
  idUser: number | null;
  role: string | null;
  res: NextApiResponse | null;
}

export interface IPayload {
  id: number;
  role: string;
  exp: number;
}

const typeDefs = loadSchemaSync("./**/*.graphql", {
  loaders: [new GraphQLFileLoader()],
});

const context = ({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  const payload = valiteAndRefreshToken(req, res) as IPayload;

  if (payload != null) {
    return {
      prisma,
      idUser: payload.id,
      role: payload.role,
    };
  } else {
    return { prisma };
  }
};

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
  context: context,
});

export const startServer = apolloServer.start();

//refresh token
function valiteAndRefreshToken(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers;
  // Get token withoit the bearer
  const cleanToken = token.authorization?.split(" ")[1];

  try {
    const payload = jwt.verify(
      cleanToken!,
      process.env.JWT_SECRET!
    ) as IPayload;

    const newToken = jwt.sign(
      {
        id: payload.id,
        role: payload.role,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
      },
      process.env.JWT_SECRET!
    );
    res.setHeader("authorization", `Bearer ${newToken}`);

    return payload;
  } catch (error) {
    return null;
  }
}
