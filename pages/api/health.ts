import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import NextCors from "nextjs-cors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  //get token from header
  const token = req.headers.authorization?.split(" ")[1];
  //verify token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    //verify token
    const data = jwt.verify(token, process.env.JWT_SECRET!);
    //add user from payload
    res
      .status(200)
      .json({ message: "Connected with Server with authorization", data });
    res.end();
  } catch (e) {
    res
      .status(401)
      .json({ message: "Connected with Server without authorization" });
  }
}
