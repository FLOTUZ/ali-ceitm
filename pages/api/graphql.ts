import { NextApiRequest, NextApiResponse } from "next";
import { startServer, apolloServer } from "@graphql";

import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //Get the user token from the headers.
  const token = req.headers.authorization;
  //Verify token existence
  // if (!token) return res.status(401).redirect("/auth/login");

  // try {
  //   // Get token withoit the bearer
  //   const cleanToken = token?.split(" ")[1];
  //   //Verify if JWT token is valid
  //   jwt.verify(cleanToken, process.env.JWT_SECRET!);
  //   //If token is valid, refresh it
  //   refreshToken(res, token);
  //   //Error of JWT validation
  // } catch (error) {
  //   return res.status(401).json({ error });
  // }

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

//refresh token
function refreshToken(res: NextApiResponse, token: string) {
  const decoded: any = jwt.verify(
    token?.split(" ")[1],
    process.env.JWT_SECRET!
  );

  const newToken = jwt.sign(
    {
      id: decoded.id,
      role: decoded.role,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
    },
    process.env.JWT_SECRET!
  );
  res.setHeader("authorization", newToken);
}
