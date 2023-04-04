import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

// Creates a global prisma client (single client) for development in next js with hot reloading
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
