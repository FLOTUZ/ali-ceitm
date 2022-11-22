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

  const isTimeOfBreakfast = moment().isAfter(
    moment().hour(12).minute(0).second(0)
  );

  await prisma.settings.create({
    data: {
      nombre: "alimento",
      tipo_dato: "text",
      valor: isTimeOfBreakfast ? "DESAYUNO" : "COMIDA",
    },
  });

  await prisma.settings.create({
    data: {
      nombre: "lugar",
      tipo_dato: "text",
      valor: "CAMPUS 1 - 1",
    },
  });

  const week = moment().week();
  const isPair = week % 2 === 0;
  await prisma.settings.create({
    data: {
      nombre: "semana",
      tipo_dato: "select",
      valor: isPair ? "PAR" : "NON",
    },
  });

  await prisma.settings.create({
    data: {
      nombre: "strikes",
      tipo_dato: "number",
      valor: "3",
    },
  });

  await prisma.settings.create({
    data: {
      nombre: "hora_cambio",
      tipo_dato: "time",
      valor: "12:00:00",
    },
  });

  await prisma.settings.create({
    data: {
      nombre: "num_semana",
      tipo_dato: "number",
      valor: moment().week().toString(), //Current week number
    },
  });

  // ============== BECA ACTIVA ==================== //

  await prisma.beca.create({
    data: {
      nombre: "ALI 2022",
      descripcion: "Becas alimenticias",
      inicia: "2022-10-22T05:46:33.322Z",
      termina: "2022-11-07T05:46:33.322Z",
      is_active: true,
    },
  });

  // ============= USUARIO ADMIN ======================= //
  const admin = await prisma.user.create({
    data: {
      email: "admin@localhost",
      password: "$2b$10$wNUByTCfVbYS4oWx0eiE.Ol4cEBEX0c6kuKFU9zPsIocvuhQdvi8G",
      roleId: 1,
      is_active: true,
      is_deleted: false,
    },
  });

  await prisma.persona.create({
    data: {
      nombres: "admin",
      a_paterno: "admin",
      a_materno: "admin",
      n_control: "22120214",
      telefono: "52 (443) 312-1570",
      whatsapp: "52 (443) 312-1570",
      carreraId: 1,
      email_institucional: "ceitm@morelia.tecnm.mx",
      campus: 1,
      userId: admin.id,
    },
  });

  // ============= USUARIO CONCEJAL ======================= //
  const concejal = await prisma.user.create({
    data: {
      email: "emmanuel@ceitm.com",
      password: "$2b$10$wNUByTCfVbYS4oWx0eiE.Ol4cEBEX0c6kuKFU9zPsIocvuhQdvi8G",
      roleId: 3,
      is_active: true,
      is_deleted: false,
    },
  });

  await prisma.persona.create({
    data: {
      nombres: "EMMANUEL",
      a_paterno: "ESQUIVEL",
      a_materno: "PARDO",
      n_control: "22120215",
      telefono: "4433110399",
      whatsapp: "4433110399",
      carreraId: 1,
      email_institucional: "18120215@morelia.tecnm.mx",
      campus: 1,
      userId: concejal.id,
    },
  });

  // ============= USUARIO BECARIO ======================= //
  const becario = await prisma.user.create({
    data: {
      email: "sarahi@morelia.tecnm.mx",
      password: "$2b$10$wNUByTCfVbYS4oWx0eiE.Ol4cEBEX0c6kuKFU9zPsIocvuhQdvi8G",
      roleId: 2,
      is_active: true,
      is_deleted: false,
    },
  });

  const persona = await prisma.persona.create({
    data: {
      nombres: "SARAHI",
      a_paterno: "ESQUIVEL",
      a_materno: "PARDO",
      n_control: "22120216",
      telefono: "4433110400",
      whatsapp: "4433110400",
      carreraId: 3,
      email_institucional: "18120216@morelia.tecnm.mx",
      campus: 1,
      userId: becario.id,
    },
  });

  await prisma.becario.create({
    data: {
      turno: "DESAYUNO",
      semana_cobro: "PAR",
      puede_cobrar: true,
      en_lista_espera: false,
      personaId: persona.id,
      becaId: 1,
    },
  });

  // ============= USUARIO CAJERO ======================= //

  const cafeteria = await prisma.cafeteria.create({
    data: {
      nombre: "Principal",
      campus: "CAMPUS 1",
    },
  });
  const caja = await prisma.user.create({
    data: {
      email: "caja1@morelia.tecnm.mx",
      password: "$2b$10$wNUByTCfVbYS4oWx0eiE.Ol4cEBEX0c6kuKFU9zPsIocvuhQdvi8G",
      roleId: 4,
      is_active: true,
      is_deleted: false,
    },
  });

  await prisma.persona.create({
    data: {
      nombres: "MARIA",
      a_paterno: "RAMIREZ",
      a_materno: "SAENZ",
      n_control: "22120217",
      telefono: "4433110399",
      whatsapp: "4433110399",
      carreraId: 1,
      email_institucional: "18120217@morelia.tecnm.mx",
      campus: 1,
      userId: caja.id,
      cafeteriaId: cafeteria.id,
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
