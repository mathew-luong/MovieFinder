import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

const client = globalThis.prisma || new PrismaClient();

// Creates a global prisma client (single client) for development in next js with hot reloading
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
