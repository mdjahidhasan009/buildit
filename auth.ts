import NextAuth from "next-auth"
import Github from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client/edge";
// import { PrismaClient } from '@prisma/client';
import GitHub from "next-auth/providers/github";
import authConfig from "@/auth.config";
import { Adapter } from "next-auth/adapters";
import { withAccelerate } from "@prisma/extension-accelerate";

console.log(process.env.NEXTAUTH_SECRET)
const prisma = new PrismaClient(
  {
    datasources: {
      db: {
        url: process.env.DIRECT_DATABASE_URL,
      },
    },
  }
).$extends(withAccelerate())
// const prisma = new PrismaClient().$extends(withAccelerate<PrismaClient>());
// const prisma = new PrismaClient()

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  // providers: [ GitHub ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }: any) {
      session.user.id = user.id;
      return session;
    },
  },
  ...authConfig
})