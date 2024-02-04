// import { json, type RequestHandler } from '@next/api';
// import { SnippetUseCases } from '@/core/application/use-cases/snippetUseCases';
// import { ViewUseCases } from '@/core/application/use-cases/viewUseCases';
// import { PrismaSnippetRepository } from '@/infrastructure/adapters/prismaSnippetRepository';
// import { PrismaViewRepository } from '@/infrastructure/adapters/prismaViewRepository';
// // import {RequestHandler} from "next/dist/server/next";
//
// const snippetRepository = new PrismaSnippetRepository();
// const viewRepository = new PrismaViewRepository();
// const snippetUseCases = new SnippetUseCases(snippetRepository);
// const viewUseCases = new ViewUseCases(snippetRepository, viewRepository);
//
// export const config = {
//   runtime: 'experimental-edge',
// };
//
// const snippetHandler: RequestHandler = async (req) => {
//   const { id } = req.query;
//
//   try {
//     switch (req.method) {
//       case 'GET':
//         const snippet = await snippetUseCases.getSnippetById(id as string);
//         if (!snippet) {
//           return new Response(JSON.stringify({ error: 'Snippet not found' }), {
//             status: 404,
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           });
//         }
//         // Increment view count when a snippet is fetched
//         await viewUseCases.incrementViewCount(id as string);
//         return json(snippet);
//
//       // Implement other methods (POST, PUT, DELETE) as needed
//       default:
//         return new Response(null, { status: 405 });
//     }
//   } catch (error) {
//     return new Response(JSON.stringify({ error: 'Internal server error', detail: error.message }), {
//       status: 500,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   }
// };
//
// export default snippetHandler;



import { NextRequest, NextResponse } from "next/server";
import { limiter } from "@/lib/limiter";
import { prisma } from "@/lib/prisma";
import { prepare } from "@/lib/prepare";
import { DEFAULT_VALUES } from "@/lib/values";
import {authMiddleware} from "@/middleware/authMiddleware";
import {rateLimitMiddleware} from "@/middleware/rateLimitMiddleware";
import {Session} from "next-auth";
import {postHandler} from "@/utils/requestHandlerFactory";
import {SnippetUseCases} from "@/core/application/use-cases/snippetUseCases";
import {PrismaSnippetRepository} from "@/infrastructure/adapters/prismaSnippetRepository";

// async function commonMiddleware(req: NextRequest): Promise<Session | NextResponse> {
//   if(!req) return new NextResponse(JSON.stringify({ code: "INTERNAL_SERVER_ERROR", detail: "Request not found" }), { status: 500 });
//   let result: NextResponse | null;
//   let session: NextResponse<unknown> | Session = null;
//
//   session = await authMiddleware(req);
//   console.log('session')
//   console.log(session)
//   if (!session) {
//     return new NextResponse(JSON.stringify({ code: "UNAUTHORIZED" }), { status: 403 });
//   }
//
//   result = await rateLimitMiddleware(req);
//   console.log('rateLimitMiddleware')
//   console.log(result)
//   if (result) return result;
//
//   return session; // Indicate that no middleware has stopped the request
// }

// const handleRequest = async (req: NextRequest) => {
//   const result: Session | NextResponse<unknown> = await commonMiddleware(req);
//   if (result instanceof NextResponse) return [null, null, result];
//
//   const body = await req.json();
//   const userId = result?.user?.id;
//
//   return [body, userId, null];
// }


// export const PATCH = async (req: NextRequest) => {
//   try {
//     const result = await commonMiddleware(req);
//     if (result) return result;
//
//     const body = await req.json();
//     const userId = req.headers.get('x-user-id');
//     const id = body.id;
//
//
//
//
//
//
//     const updatedSnippet = await prisma.snippet.update({
//       where: { id, userId },
//       data: prepare(body),
//     });
//
//     return new NextResponse(JSON.stringify(updatedSnippet), { status: 200 });
//   } catch (e) {
//     return new NextResponse(JSON.stringify({ code: "INTERNAL_SERVER_ERROR", detail: e.message }), { status: 500 });
//   }
// }

export const POST = async (req: NextRequest) => {
  try {
    const [ body, userId, earlyAbortResponse ] = await postHandler(req);
    // If commonMiddleware produced a NextResponse(error response), terminate early
    if (earlyAbortResponse) return earlyAbortResponse;
    if (body.snippetCount >= 10) {
      return new NextResponse(JSON.stringify({ code: "LIMIT_REACHED" }), { status: 403 });
    }

    const snippetRepository = new PrismaSnippetRepository();
    const snippetUseCases = new SnippetUseCases(snippetRepository);

    const createdSnippet = await snippetUseCases.createSnippet({ ...body, userId } );

    // const createdSnippet = await prisma.snippet.create({
    //   data: {
    //     userId,
    //     ...prepare(body),
    //     customColors: DEFAULT_VALUES.customColors,
    //     views: { create: { count: 0 } },
    //   },
    //   include: { views: true },
    // });

    return new NextResponse(JSON.stringify(createdSnippet), { status: 200 });
  } catch (e) {
    console.error(e)
    return new NextResponse(JSON.stringify({ code: "INTERNAL_SERVER_ERROR", detail: e.message }), { status: 500 });
  }
}

// export const DELETE = async (req: NextRequest) => {
//   // const result = await commonMiddleware(req);
//   // if (result) return result;
//   //
//   // const { searchParams } = new URL(req.url);
//   // const id = searchParams.get("id");
//   // const userId = req.headers.get('x-user-id');
//
//   try {
//     const result = await commonMiddleware(req);
//     if (result) return result;
//
//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get("id");
//     const userId = req.headers.get('x-user-id');
//
//
//
//
//     const deletedSnippet = await prisma.snippet.delete({
//       where: { id, userId },
//       select: { id: true },
//     });
//
//     return new NextResponse(JSON.stringify(deletedSnippet), { status: 200 });
//   } catch (e) {
//     return new NextResponse(JSON.stringify({ code: "INTERNAL_SERVER_ERROR", detail: e.message }), { status: 500 });
//   }
// }

// export async function router(req: NextRequest) {
//   // Apply authentication middleware
//   if(!req) return new NextResponse(JSON.stringify({ code: "INTERNAL_SERVER_ERROR", detail: "Request not found" }), { status: 500 });
//
//   let result: NextResponse<unknown> | null;
//
//   result = await authMiddleware(req);
//   if (result) return result;
//
//   // Apply rate limiting middleware
//   result = await rateLimitMiddleware(req);
//   if (result) return result;
//
//   const userId = req.headers.get('x-user-id'); // Extract userId set by authMiddleware
//   const url = new URL(req.url);
//   const id = url.searchParams.get("id"); // Direct extraction from the request URL
//
//   if (!userId) {
//     return new NextResponse(JSON.stringify({ code: "UNAUTHORIZED" }), { status: 403 });
//   }
//
//   try {
//     switch (req.method) {
//       case 'PATCH': {
//         const body = await req.json();
//         // Ensure ID is provided for PATCH requests
//         if (!id) {
//           return new NextResponse(JSON.stringify({ code: "SNIPPET_NOT_FOUND" }), { status: 404 });
//         }
//         const updatedSnippet = await prisma.snippet.update({
//           // where: { id, userId: session.user.id },
//           where: { id, userId: userId },
//           data: prepare(body),
//         });
//         return new NextResponse(JSON.stringify(updatedSnippet), { status: 200 });
//       }
//       case 'POST': {
//         const body = await req.json();
//         if (body.snippetCount >= 10) {
//           return new NextResponse(JSON.stringify({ code: "LIMIT_REACHED" }), { status: 403 });
//         }
//         const createdSnippet = await prisma.snippet.create({
//           data: {
//             // userId: session.user.id,
//             userId: userId,
//             ...prepare(body),
//             customColors: DEFAULT_VALUES.customColors,
//             views: { create: { count: 0 } },
//           },
//           include: { views: true },
//         });
//         return new NextResponse(JSON.stringify(createdSnippet), { status: 200 });
//       }
//       case 'DELETE': {
//         if (!id) {
//           return new NextResponse(JSON.stringify({ code: "SNIPPET_NOT_FOUND" }), { status: 404 });
//         }
//         const deletedSnippet = await prisma.snippet.delete({
//           // where: { id, userId: session.user.id },
//           where: { id, userId: userId },
//           select: { id: true },
//         });
//         return new NextResponse(JSON.stringify(deletedSnippet), { status: 200 });
//       }
//       default:
//         return new NextResponse(JSON.stringify({ code: "METHOD_NOT_ALLOWED" }), { status: 405 });
//     }
//   } catch (e) {
//     return new NextResponse(JSON.stringify({ code: "INTERNAL_SERVER_ERROR", detail: e.message }), { status: 500 });
//   }
// }
