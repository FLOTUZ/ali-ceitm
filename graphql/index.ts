import { ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

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
  CarreraResolver
} from "./resolvers";

const typeDefs = loadSchemaSync("./**/*.graphql", {
  loaders: [new GraphQLFileLoader()],
});

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
    CarreraResolver
  ],
});

export const apolloServer = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

export const startServer = apolloServer.start();
