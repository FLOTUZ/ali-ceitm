import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@services";

// Web hook de semana automatico
export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const turn = await prisma.settings.findUnique({
      where: {
        nombre: "alimento",
      },
    });    

    const turnChanged = await prisma?.settings.update({
      where: {
        nombre: "alimento",
      },
      data: {
        valor: turn?.valor === "COMIDA" ? "DESAYUNO" : "COMIDA",
      },
    });

    return res
      .status(200)
      .json({ message: `Semana cambiada a => ${turnChanged.valor}` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error" });
  }
}
