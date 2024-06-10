import {NextRequest, NextResponse} from "next/server";
import {Session} from "next-auth";
import {authMiddleware} from "@/middlewarelol/authMiddleware";
import {rateLimitMiddleware} from "@/middlewarelol/rateLimitMiddleware";

const checkAuthAndRateLimit = async (req: NextRequest): Promise<NextResponse<unknown> | Session | null> => {
  if (!req) {
    const errorResponse = JSON.stringify({ code: "INTERNAL_SERVER_ERROR", detail: "Request not found" });
    return new NextResponse(errorResponse, { status: 500 });
  }

  let sessionOrResponse: NextResponse<unknown> | Session = await authMiddleware(req);
  if (sessionOrResponse instanceof NextResponse) {
    console.error('authMiddleware produced a NextResponse(error response)', sessionOrResponse);
    return sessionOrResponse;
  }

  const rateLimitResponse: NextResponse | null = await rateLimitMiddleware(req);
  if (rateLimitResponse instanceof NextResponse) {
    console.error('rateLimitMiddleware produced a NextResponse(error response)', rateLimitResponse);
    return rateLimitResponse;
  }

  return sessionOrResponse;
}

export default checkAuthAndRateLimit;