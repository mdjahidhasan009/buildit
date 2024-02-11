import {NextResponse} from "next/server";
import checkAuthAndRateLimit from "@/middleware/checkAuthAndRateLimit";
import {Session} from "next-auth";

function createRequestHandler(options =  { requireAuth: true, expectBody: true } ) {
  return async (req: NextRequest): Promise<[any | null, string | undefined, NextResponse<Session> | null]> => {
    const middlewareResult = await checkAuthAndRateLimit(req);
    if (middlewareResult instanceof NextResponse || null) return [null, undefined, middlewareResult];

    // const body = expectBody ? await req.json() : null;
    try {
      var body = options?.expectBody ? await req.json() : null;
    } catch (error) {
      console.error('Invalid Json', error);
      return [null, undefined, new NextResponse(JSON.stringify({ code: "INVALID_JSON" }), { status: 400 })];
    }
    const userId = options?.requireAuth ? middlewareResult?.user?.id : undefined;

    return [body, userId, null];
  };
}

// export const postHandler = createRequestHandler(options);
export function postHandler(options) {
  return createRequestHandler(options);
}
export const patchHandler = createRequestHandler();
export const deleteHandler = createRequestHandler();
export const getPublicHandler = createRequestHandler();
export const getPrivateHandler = createRequestHandler();