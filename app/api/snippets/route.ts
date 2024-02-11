import { NextRequest, NextResponse } from "next/server";
import { requestHandler } from "@/utils/requestHandlerFactory";
import {SnippetUseCases} from "@/core/application/use-cases/snippetUseCases";
import {PrismaSnippetRepository} from "@/infrastructure/adapters/prismaSnippetRepository";

export const PATCH = async (req: NextRequest) => {
  try {
    const [ body, userId, earlyAbortResponse ] = await requestHandler({ requireAuth: true, expectBody: true })(req);
    // If commonMiddleware produced a NextResponse(error response), terminate early
    if (earlyAbortResponse) return earlyAbortResponse;
    if (body.snippetCount >= 10) {
      return new NextResponse(JSON.stringify({ code: "LIMIT_REACHED" }), { status: 403 });
    }

    const snippetRepository = new PrismaSnippetRepository();
    const snippetUseCases = new SnippetUseCases(snippetRepository);
    const updatedSnippet = await snippetUseCases.updateSnippet(body.id, { ...body, userId } );

    return new NextResponse(JSON.stringify(updatedSnippet), { status: 200 });
  } catch (e) {
    console.error(e)
    return new NextResponse(JSON.stringify({ code: "INTERNAL_SERVER_ERROR", detail: e.message }), { status: 500 });
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const [ body, userId, earlyAbortResponse ] = await requestHandler({ requireAuth: true, expectBody: true })(req);
    // If commonMiddleware produced a NextResponse(error response), terminate early
    if (earlyAbortResponse) return earlyAbortResponse;
    if (body.snippetCount >= 10) {
      return new NextResponse(JSON.stringify({ code: "LIMIT_REACHED" }), { status: 403 });
    }

    const snippetRepository = new PrismaSnippetRepository();
    const snippetUseCases = new SnippetUseCases(snippetRepository);

    const createdSnippet = await snippetUseCases.createSnippet({ ...body, userId } );

    return new NextResponse(JSON.stringify(createdSnippet), { status: 200 });
  } catch (e) {
    console.error(e)
    return new NextResponse(JSON.stringify({ code: "INTERNAL_SERVER_ERROR", detail: e.message }), { status: 500 });
  }
}

export const DELETE = async (req: NextRequest) => {
  try {
    const [ , userId, earlyAbortResponse ] = await requestHandler({ requireAuth: true, expectBody: false })(req);
    // If commonMiddleware produced a NextResponse(error response), terminate early
    if (earlyAbortResponse) return earlyAbortResponse;

    const snippetRepository = new PrismaSnippetRepository();
    const snippetUseCases = new SnippetUseCases(snippetRepository);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const deletedSnippet = await snippetUseCases.deleteSnippet(id as string, userId as string);


    return new NextResponse(JSON.stringify(deletedSnippet), { status: 200 });
  } catch (e) {
    console.error(e);
    return new NextResponse(JSON.stringify({ code: "INTERNAL_SERVER_ERROR", detail: e.message }), { status: 500 });
  }
}
