import { NextRequest, NextResponse } from "next/server";
import { Session } from "next-auth";

function createRequestHandler(options: { requireAuth?: boolean; expectBody?: boolean } = { requireAuth: true, expectBody: true }) {
  return async (req: NextRequest): Promise<[any | null]> => {
    // const middlewareResult = await checkAuthAndRateLimit(req);
    // if (middlewareResult instanceof NextResponse || middlewareResult === null) return [null, undefined, middlewareResult as NextResponse<Session> | null];
    let body = null;
    try {
      body = options?.expectBody ? await req.json() : null;
    } catch (error) {
      console.error('Invalid Json', error);
      return [null];
    }
    // const userId = options?.requireAuth ? middlewareResult?.user?.id : undefined;

    return [body];
  };
}

export function requestHandler(options?: { requireAuth?: boolean; expectBody?: boolean }) {
  return createRequestHandler(options);
}
