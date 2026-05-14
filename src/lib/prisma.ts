import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import pg from "pg";

const connectionString = process.env.DATABASE_URL!;

const globalForPrisma = global as unknown as {
  prisma?: PrismaClient;
};

const adapter = new PrismaPg(
  new pg.Pool({
    connectionString,
  })
);

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}