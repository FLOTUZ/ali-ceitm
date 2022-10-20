import { NextApiRequest, NextApiResponse } from "next";
import { startServer, apolloServer } from "@graphql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //GraphQL Init
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
