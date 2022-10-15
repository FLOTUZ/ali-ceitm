import { PrismaClient } from "@prisma/client";

//Prisma Client instance for production
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

//Prisma Client instance for development
export const prisma =
  global.prisma ||
  new PrismaClient({
    //Logging for querys in development
    // log: ["query"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
