import {NextResponse} from "next/server";
import checkAuthAndRateLimit from "@/middleware/checkAuthAndRateLimit";

function createRequestHandler({ requireAuth = false, expectBody = false } = {}) {
  return async (req: NextRequest): Promise<[any, string | undefined, NextResponse<unknown> | null]> => {
    const middlewareResult = await checkAuthAndRateLimit(req);
    if (middlewareResult instanceof NextResponse || null) return [null, undefined, middlewareResult];

    const body = expectBody ? await req.json() : null;
    const userId = requireAuth ? middlewareResult?.user?.id : undefined;

    return [body, userId, null];
  };
}

export const postHandler = createRequestHandler({ requireAuth: true, expectBody: true });
export const getPublicHandler = createRequestHandler();
export const getPrivateHandler = createRequestHandler();