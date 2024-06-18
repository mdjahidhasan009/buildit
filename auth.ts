import NextAuth from "next-auth"
import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaNeon } from "@prisma/adapter-neon"
import { Pool } from "@neondatabase/serverless"
import authConfig from "@/auth.config";

const neon = new Pool({
  connectionString: process.env.DIRECT_DATABASE_URL,
})
const adapter = new PrismaNeon(neon)
const prisma = new PrismaClient({ adapter })

export const {
  handlers,
  auth,
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user }: any) {
      session.user.id = user.id;
      return session;
    },
  },
  ...authConfig
})