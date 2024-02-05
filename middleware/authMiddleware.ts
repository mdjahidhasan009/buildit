import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {Session} from "next-auth";

export async function authMiddleware(req: NextRequest) {
  const session: Session = await getSession(req);
  console.log('session')
  console.log(session)
  if (!session || !session.user.id) {
    return new NextResponse(JSON.stringify({ code: "UNAUTHORIZED" }), { status: 403 });
  }

  // req.user = session.user;

  // If authenticated, add the userId to headers for downstream use
  // const response = new NextResponse(null);
  // response.headers.set('X-User-Id', session.user.id);
  // return response;
  return session;
}
