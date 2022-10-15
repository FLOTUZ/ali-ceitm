import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@services";
import { UserDto } from "@models";
import * as yup from "yup";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    // const { username, email, password } = req.body;
    const userToUpload: UserDto = req.body;

    const validation = await isTest(userToUpload);

    const salt = await bcrypt.genSalt();
    userToUpload.password = await bcrypt.hash(userToUpload.password, salt);

    if (validation != null) {
      res.status(400).json({ errors: validation });
      return;
    }

    try {
      const user = await prisma.user.create({
        data: userToUpload,
      });
      res.json(user);
    } catch (error: any) {
      if (error.code === "P2002")
        res.status(409).json({ error: "Email or Username already on use" });
    }
  }
}

//Validate user input with yup
async function isTest(user: UserDto) {
  let schema = yup.object().shape({
    username: yup.string().required().strict(),
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
  });

  try {
    await schema.validate(user);
    return null;
  } catch (e: any) {
    return e.errors;
  }
}
