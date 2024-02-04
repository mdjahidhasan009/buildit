import { NextRequest, NextResponse } from "next/server";
import { limiter } from "@/lib/limiter";

export async function rateLimitMiddleware(req: NextRequest | null): Promise<NextResponse | null> {
  if(!req) return new NextResponse(JSON.stringify({ code: "INTERNAL_SERVER_ERROR", detail: "Request not found" }), { status: 500 });

  const operationType = req.method === "PATCH" ? "UPDATE_SNIPPET" : req.method === "POST" ? "CREATE_SNIPPET" : "OTHER_OPERATION";
  const { allowed } = await limiter().check(30, operationType);

  if (!allowed) {
    return new NextResponse(JSON.stringify({ code: "TOO_MANY_REQUESTS" }), { status: 429 });
  }

  // Proceed if rate limit check passes
  return null;
}
