import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.role.create({
    data: {
      rol_name: "ADMIN",
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
