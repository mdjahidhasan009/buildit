import { NextResponse } from "next/server";
import { auth } from "@/auth";
import {Session} from "next-auth";

export async function authMiddleware(): Promise<NextResponse | null> {
  const session: Session | null = await auth();

  if (!session || !session.user) {
    return new NextResponse(
      JSON.stringify(
        {
          success: false,
          message: "authentication failed"
        }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
  }

  return null;
}