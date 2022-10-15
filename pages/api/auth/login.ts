import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "@services";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Get credentials from request body
    const { email, password } = req.body;

    // Verify if user exists on database
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // If user does not exist, return not found error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //Verify if password is correct comparing the hash of encrypted password
    const isMatch = await bcrypt.compare(password, user!.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Time of token expiration
    const expiry = 60 * 60 * 24 * 7; // 7 days

    // Create JWT token
    const token = jwt.sign(
      {
        id: user!.id,
        role: user.roleId,
        exp: Math.floor(Date.now() / 1000) + expiry,
      },
      process.env.JWT_SECRET!
    );
    // Return token
    return res.json({ "access-token": token });
  }
}
