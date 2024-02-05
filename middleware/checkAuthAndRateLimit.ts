import {NextRequest, NextResponse} from "next/server";
import {Session} from "next-auth";
import {authMiddleware} from "@/middleware/authMiddleware";
import {rateLimitMiddleware} from "@/middleware/rateLimitMiddleware";

const checkAuthAndRateLimit = async (req: NextRequest): Promise<NextResponse<unknown> | Session | null> => {
  if (!req) {
    const errorResponse = JSON.stringify({ code: "INTERNAL_SERVER_ERROR", detail: "Request not found" });
    return new NextResponse(errorResponse, { status: 500 });
  }

  let sessionOrResponse: NextResponse<unknown> | Session = await authMiddleware(req);
  if (sessionOrResponse instanceof NextResponse) {
    return sessionOrResponse;
  }

  const rateLimitResponse: NextResponse | null = await rateLimitMiddleware(req);
  if (rateLimitResponse instanceof NextResponse) return rateLimitResponse;

  return sessionOrResponse;
}

export default checkAuthAndRateLimit;