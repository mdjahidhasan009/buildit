import { NextResponse } from "next/server";
import { NextAuthRequest } from "next-auth/lib";
import {rateLimitMiddleware} from "@/middlewares/rateLimitMiddleware";
import {authMiddleware} from "@/middlewares/authMiddleware";

export async function middleware(req: NextAuthRequest) {
  const rateLimitResponse: NextResponse | null = await rateLimitMiddleware(req);
  if (rateLimitResponse instanceof NextResponse) {
    console.error('rateLimitMiddleware produced a NextResponse(error response)', rateLimitResponse);
    return rateLimitResponse;
  }

  const authResponse: NextResponse | null = await authMiddleware();
  if(authResponse) {
    console.error('authMiddleware produced a NextResponse(error response)', authResponse);
    return authResponse;
  }

  NextResponse.next();
}
// https://github.com/vercel/next.js/discussions/31188
// https://github.com/vercel/next.js/issues/33199
// https://github.com/vercel/vercel/discussions/8487
// https://github.com/vercel/next.js/pull/41380
export const config = {
  matcher: [
    {
      source: "/((?!_next/static|_next/image|favicon.ico|api/auth/providers|api/auth/signin/github|api/auth/csrf|api/auth/session|api/v1/snippets/[^/]+).*)",
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
        { type: 'header', key: 'Sec-Fetch-Dest', value: 'document' }
      ],
    },
  ],
};

export const runtime = "experimental-edge";