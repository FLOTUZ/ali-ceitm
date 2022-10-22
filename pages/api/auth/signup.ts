import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "services";
import { PersonaDTO, UserDto } from "@models";
import * as yup from "yup";
import bcrypt from "bcrypt";
import { Persona, User } from "@prisma/client";

const userValidationSchema = yup.object().shape({
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
    const { email, password } = userData;

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
    const encryptedPassword = await bcrypt.hash(password, salt);

    let savedUser = {} as User | null;
    let savedPerson = {} as Persona | null;
    try {
      savedUser = await prisma.user.create({
        data: { email, password: encryptedPassword },
      });
    } catch (e: any) {
      res.status(400).json({ errors: "El email de usuario ya esta en uso" });
      return;
    }

    try {
      savedPerson = await prisma.persona.create({
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
          userId: savedUser!.id,
        },
      });

      res.status(201).json({ message: "Usuario registrado correctamente" });
      return;
    } catch (error: any) {
      await prisma.user.delete({ where: { id: savedUser!.id } });
      if (error.code === "P2002") {
        res.status(400).json({
          error: "Email institucional or Numero de control ya esta en uso",
        });
        return;
      }

      res.status(500).json({ error: "Internal server error", message: error });
      return;
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
