// import { NextRequest, NextResponse } from "next/server";
// import { rateLimitMiddleware } from "@/middlewarelol/rateLimitMiddleware";
// import { authMiddleware } from "@/middlewarelol/authMiddleware";
//
// const PUBLIC_API_PATHS = ['/api/public', '/api/open'];
//
// export async function middlewarelol(req: NextRequest) {
//   console.log('Middleware executed');
//
//   // Apply rate limit middlewarelol to all requests
//   const rateLimitResponse = await rateLimitMiddleware(req);
//   if (rateLimitResponse instanceof NextResponse) {
//     console.error('Rate limiting response:', rateLimitResponse);
//     return rateLimitResponse;
//   }
//
//   // Conditionally apply auth middlewareutils to private routes
//   const isPrivateAPI = !PUBLIC_API_PATHS.some(path => req.nextUrl.pathname.startsWith(path));
//   if (isPrivateAPI) {
//     const authResponse = await authMiddleware(req);
//     if (authResponse instanceof NextResponse) {
//       console.error('Authentication response:', authResponse);
//       return authResponse;
//     }
//   }
//
//   return NextResponse.next();
// }
//
// export const config = {
//   matcher: ["/api/:path*"], // Apply middlewareutils to all API routes
// };


import { NextRequest, NextResponse } from "next/server";
import { rateLimitMiddleware } from "@/middlewarelol/rateLimitMiddleware";
import { authMiddleware } from "@/middlewarelol/authMiddleware";

const PUBLIC_API_PATHS = ['/api/public', '/api/open'];

export async function middleware(req: NextRequest) {
  console.log('Middleware executed');

  // Apply rate limit middlewarelol to all requests
  const rateLimitResponse = await rateLimitMiddleware(req);
  if (rateLimitResponse instanceof NextResponse) {
    console.error('Rate limiting response:', rateLimitResponse);
    return rateLimitResponse;
  }

  // Conditionally apply auth middlewarelol to private routes
  const isPrivateAPI = !PUBLIC_API_PATHS.some(path => req.nextUrl.pathname.startsWith(path));
  if (isPrivateAPI) {
    const authResponse = await authMiddleware(req);
    if (authResponse instanceof NextResponse) {
      console.error('Authentication response:', authResponse);
      return authResponse;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"], // Apply middlewarelol to all API routes
};
