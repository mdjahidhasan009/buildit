import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "@/lib/prisma";

const isProd = process.env.NODE_ENV === "production";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // @ts-ignore
    async session({ session, user }) {
      // @ts-ignore
      session.user.id = user.id;
      return session;
    },
  },
};