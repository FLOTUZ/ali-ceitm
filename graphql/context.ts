import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

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

//refresh token
export function valiteAndRefreshToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
