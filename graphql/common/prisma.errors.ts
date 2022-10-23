import { Prisma } from "@prisma/client";

interface IPrismaError {
  code: number;
  message: string;
  description: unknown;
  meta: any;
}

export const validatePrismaErrors = (error: any) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const { code, message, meta, cause } =
      error as Prisma.PrismaClientKnownRequestError;

    if (code === "P2001") {
      const result: IPrismaError = {
        code: 404,
        message: "Not Found",
        description: cause,
        meta,
      };
      return result;
    }

    if (code === "P2002") {
      
      const result: IPrismaError = {
        code: 409,
        message: "Conflict",
        description: cause,
        meta,
      };

      
      return result;
    }
  }
  throw error;
};
