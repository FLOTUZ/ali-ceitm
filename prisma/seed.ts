import { PrismaClient } from "@prisma/client";
import moment from "moment";

const prisma = new PrismaClient();

async function main() {
  await prisma.role.create({
    data: {
      rol_name: "ADMIN",
    },
  });

  await prisma.role.create({
    data: {
      rol_name: "BECARIO",
    },
  });

  await prisma.role.create({
    data: {
      rol_name: "CONCEJAL",
    },
  });

  await prisma.role.create({
    data: {
      rol_name: "CAJERO",
    },
  });

  await prisma.user.create({
    data: {
      username: "admin",
      email: "admin@localhost",
      password: "admin",
      roleId: 1,
      is_active: false,
      is_deleted: false,
    },
  });

  await prisma.carrera.create({
    data: {
      nombre: "N/A",
    },
  });

  // ==================== CARRERAS ====================
  await prisma.carrera.create({
    data: {
      nombre: "INGENIERIA EN TECONOLOGIAS DE LA INFORMACION",
    },
  });
  await prisma.carrera.create({
    data: {
      nombre: "INGENIERÍA EN SISTEMAS COMPUTACIONALES",
    },
  });
  await prisma.carrera.create({
    data: {
      nombre: "INGENIERÍA EN GESTIÓN EMPRESARIAL",
    },
  });
  await prisma.carrera.create({
    data: {
      nombre: "INGENIERÍA EN MECATRONICA",
    },
  });
  await prisma.carrera.create({
    data: {
      nombre: "INGENIERÍA MECANICA",
    },
  });
  await prisma.carrera.create({
    data: {
      nombre: "INGENIERÍA EN ELECTRÓNICA",
    },
  });
  await prisma.carrera.create({
    data: {
      nombre: "INGENIERÍA EN ELECTRICA",
    },
  });
  await prisma.carrera.create({
    data: {
      nombre: "INGENIERÍA BIOQUIMICA",
    },
  });
  await prisma.carrera.create({
    data: {
      nombre: "INGENIERÍA EN BIOMEDICA",
    },
  });
  await prisma.carrera.create({
    data: {
      nombre: "LICENCIATURA EN ADMINISTRACIÓN DE EMPRESAS",
    },
  });
  await prisma.carrera.create({
    data: {
      nombre: "CONTADOR PUBLICO",
    },
  });
  await prisma.carrera.create({
    data: {
      nombre: "INGENIERIA INDUSTRIAL",
    },
  });

  // ==================== PERSONAS ====================

  await prisma.persona.create({
    data: {
      nombres: "admin",
      a_paterno: "admin",
      a_materno: "admin",
      n_control: "22120215",
      telefono: "52 (443) 312-1570",
      whatsapp: "52 (443) 312-1570",
      carreraId: 1,
      email_institucional: "ceitm@morelia.tecnm.mx",
      campus: 1,
      userId: 1,
    },
  });

  const isTimeOfBreakfast = moment().isAfter(
    moment().hour(12).minute(0).second(0)
  );

  await prisma.settings.create({
    data: {
      nombre: "alimento",
      valor: isTimeOfBreakfast ? "DESAYUNO" : "COMIDA",
    },
  });

  await prisma.settings.create({
    data: {
      nombre: "lugar",
      valor: "CAMPUS 1 - 1",
    },
  });

  const week = moment().week();
  const isPair = week % 2 === 0;
  await prisma.settings.create({
    data: {
      nombre: "semana",
      valor: isPair ? "PAR" : "NON",
    },
  });

  await prisma.settings.create({
    data: {
      nombre: "strikes",
      valor: "3",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
