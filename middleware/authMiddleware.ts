// import { NextRequest, NextResponse } from "next/server";
// import { getSession } from "next-auth/react";
// // import {Session} from "next-auth";
//
// export async function authMiddleware(req: NextRequest) {
//   const session = await getSession({ req });
//   if (!session || !session.user?.id) {
//     return new NextResponse(JSON.stringify({ code: "UNAUTHORIZED" }), { status: 403 });
//   }
//
//   // req.user = session.user;
//
//   // If authenticated, add the userId to headers for downstream use
//   // const response = new NextResponse(null);
//   // response.headers.set('X-User-Id', session.user.id);
//   // return response;
//   return session;
// }

import { NextRequest, NextResponse } from "next/server";
// import { getSession } from "next-auth/react";
import { getServerSession }  from "next-auth";
import { IncomingMessage } from "http";
import {authOptions} from "@/app/api/auth/authOptions";
// import {getSession} from "@/lib/auth";

export async function authMiddleware(req: NextRequest) {
  const session = await getServerSession(authOptions)
  // const session = await getSession( req );

  // Ensure session object exists and contains the user property
  if (!session || !session.user) {
    return new NextResponse(JSON.stringify({ code: "UNAUTHORIZED" }), { status: 403 });
  }

  // @ts-ignore
  if (!session.user.id) {
    return new NextResponse(JSON.stringify({ code: "UNAUTHORIZED" }), { status: 403 });
  }

  // If authenticated, add the userId to headers for downstream use
  // const response = new NextResponse(null);
  // response.headers.set('X-User-Id', session.user.id);
  // return response;
  return session;
}

