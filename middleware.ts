

// import { NextRequest, NextResponse } from "next/server";
// import NextAuth from "next-auth"
// import { rateLimitMiddleware } from "@/middlewarelol/rateLimitMiddleware";
// import { authMiddleware } from "@/middlewarelol/authMiddleware";
// // import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
// import {auth} from "@/auth";
// import authConfig from "@/auth.config";

// const PUBLIC_API_PATHS = ['/api/public', '/api/open'];

// // const { auth } = NextAuth(authConfig)
// export async function middleware(req: NextRequest) {
//   console.log('Middleware executed');

//   // Apply rate limit middleware to all requests
//   const rateLimitResponse = await rateLimitMiddleware(req);
//   if (rateLimitResponse instanceof NextResponse) {
//     console.error('Rate limiting response:', rateLimitResponse);
//     return rateLimitResponse;
//   }


//   // Conditionally apply auth middlewarelol to private routes
//   const isPrivateAPI = !PUBLIC_API_PATHS.some(path => req.nextUrl.pathname.startsWith(path));
//   if (isPrivateAPI) {
//     // const authResponse = await authMiddleware(req);
//     // const { auth } = NextAuth(authOptions);
//     // const session = await auth()
//     // const { auth } = NextAuth(authConfig)
//     // const session = await auth(req)
//     const session = await auth()
//     console.log(session)
//     // console.log(req?.auth)
//     // if (authResponse instanceof NextResponse) {
//     //   console.error('Authentication response:', authResponse);
//     //   return authResponse;
//     // }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/api/:path*"], // Apply middlewarelol to all API routes
// };


// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return new NextResponse(JSON.stringify({ message: "You must be logged in to access this resource." }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/protected-route"],
};
