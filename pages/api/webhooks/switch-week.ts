import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@services";

// Web hook de semana automatico
export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const actualWeek = await prisma.settings.findUnique({
      where: {
        nombre: "semana",
      },
    });    

    const changeWeek = await prisma?.settings.update({
      where: {
        nombre: "semana",
      },
      data: {
        valor: actualWeek?.valor === "NON" ? "PAR" : "NON",
      },
    });

    return res
      .status(200)
      .json({ message: `Semana cambiada a => ${changeWeek.valor}` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error" });
  }
}
