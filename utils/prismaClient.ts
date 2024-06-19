import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool } from "@neondatabase/serverless";

const neon = new Pool({
    connectionString: process.env.DIRECT_DATABASE_URL,
});

const adapter = new PrismaNeon(neon);
const prisma = new PrismaClient({ adapter });

export { prisma };
