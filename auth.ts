import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './prisma/prisma';
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user }: any) {
      session.user.id = user.id;
      return session;
    },
  },
});