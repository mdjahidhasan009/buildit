import { NextRequest, NextResponse } from "next/server";
import checkAuthAndRateLimit from "@/middleware/checkAuthAndRateLimit";
import { Session } from "next-auth";

function createRequestHandler(options: { requireAuth?: boolean; expectBody?: boolean } = { requireAuth: true, expectBody: true }) {
  return async (req: NextRequest): Promise<[any | null, string | undefined, NextResponse<Session> | null]> => {
    const middlewareResult = await checkAuthAndRateLimit(req);
    if (middlewareResult instanceof NextResponse || middlewareResult === null) return [null, undefined, middlewareResult as NextResponse<Session> | null];
    let body = null;
    try {
      body = options?.expectBody ? await req.json() : null;
    } catch (error) {
      console.error('Invalid Json', error);
      return [null, undefined, new NextResponse(JSON.stringify({ code: "INVALID_JSON" }), { status: 400 })];
    }
    const userId = options?.requireAuth ? middlewareResult?.user?.id : undefined;

    return [body, userId, null];
  };
}

export function requestHandler(options?: { requireAuth?: boolean; expectBody?: boolean }) {
  return createRequestHandler(options);
}
