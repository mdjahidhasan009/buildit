import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './prisma/prisma';
import Github from 'next-auth/providers/github';

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: 'jwt' },
  adapter: PrismaAdapter(prisma),
  providers: [Github],
  callbacks: {
    // authorized({ auth, request: { nextUrl } }) {
    //   const isLoggedIn = !!auth?.user;
    //   const paths = ['/profile', '/client-side'];
    //   const isProtected = paths.some((path) =>
    //     nextUrl.pathname.startsWith(path)
    //   );
    //
    //   if (isProtected && !isLoggedIn) {
    //     const redirectUrl = new URL('/api/auth/signin', nextUrl.origin);
    //     redirectUrl.searchParams.append('callbackUrl', nextUrl.href);
    //     return Response.redirect(redirectUrl);
    //   }
    //   return true;
    // },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
    session(params) {
      return {
        ...params.session,
        user: {
          ...params.session.user,
          id: params.token.id as string,
          randomKey: params.token.randomKey,
        },
      };
    },
  },
});