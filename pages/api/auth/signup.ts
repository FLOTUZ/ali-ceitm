import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "services";
import { PersonaDTO, UserDto } from "@models";
import * as yup from "yup";
import bcrypt from "bcrypt";

const userValidationSchema = yup.object().shape({
  username: yup.string().required().strict(),
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
});

const personValidationSchema = yup.object().shape({
  nombres: yup.string().required(),
  a_paterno: yup.string().required(),
  a_materno: yup.string().required(),
  n_control: yup.string().required(),
  telefono: yup.string().required(),
  whatsapp: yup.string().required(),
  email_institucional: yup.string().email().required(),
  campus: yup.number().required(),
  semestre: yup.number().optional(),
  carreraId: yup.number().required(),
  userId: yup.number().optional(),
  imagenesId: yup.number().optional(),
  cafeteriaId: yup.number().optional(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const userData = req.body.user as UserDto;
    const personData = req.body.persona as PersonaDTO;

    const isValidUser = await isValid(userData, userValidationSchema);
    const isValidPerson = await isValid(personData, personValidationSchema);

    if (isValidUser != null) {
      res.status(400).json({ errors: isValidUser });
      res.end();
    }

    //Destrcture user data
    const { username, email, password } = userData;

    //Destructure person data
    const {
      nombres,
      a_paterno,
      a_materno,
      n_control,
      telefono,
      whatsapp,
      email_institucional,
      campus,
      carreraId,
    } = personData;

    if (isValidPerson != null) {
      res.status(400).json({ errors: isValidPerson });
      res.end();
    }

    const salt = await bcrypt.genSalt();
    userData.password = await bcrypt.hash(userData.password, salt);

    try {
      const user = await prisma.user.create({
        data: { email, password },
      });

      const person = await prisma.persona.create({
        data: {
          nombres,
          a_paterno,
          a_materno,
          n_control,
          telefono,
          whatsapp,
          email_institucional,
          campus,
          carreraId,
          userId: user.id,
        },
      });

      res.status(200).json({ user, person });
    } catch (error: any) {
      console.log(error);

      if (error.code === "P2002")
        res.status(409).json({ error: "Email or Username already on use" });

      res.status(500).json({ error: "Internal server error", message: error });
    }
  }
}

//Validate user input with yup
async function isValid(user: any, schema: yup.AnyObjectSchema) {
  try {
    await schema.validate(user);
    return null;
  } catch (e: any) {
    return e.errors;
  }
}
