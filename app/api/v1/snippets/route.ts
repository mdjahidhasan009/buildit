import { NextRequest, NextResponse } from "next/server";
import { requestHandler } from "@/utils/requestHandlerFactory";
import {SnippetUseCases} from "@/core/application/use-cases/snippetUseCases";
import {PrismaSnippetRepository} from "@/infrastructure/adapters/prismaSnippetRepository";
import {PrismaViewRepository} from "@/infrastructure/adapters/prismaViewRepository";

export const GET = async (req: NextRequest) => {
  try {
    const [ , userId, earlyAbortResponse ] = await requestHandler({ requireAuth: true, expectBody: false })(req);
    // If commonMiddleware produced a NextResponse(error response), terminate early
    if (earlyAbortResponse) return earlyAbortResponse;

    const snippetRepository = new PrismaSnippetRepository();
    const viewRepository = new PrismaViewRepository();
    const snippetUseCases = new SnippetUseCases(snippetRepository, viewRepository);
    const snippet = await snippetUseCases.getSnippets(userId as string);

    return new NextResponse(JSON.stringify(snippet), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ code: "INTERNAL_SERVER_ERROR" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    // return new NextResponse(JSON.stringify({ code: "INTERNAL_SERVER_ERROR", detail: e.message }), { status: 500 });
  }

}
export const PATCH = async (req: NextRequest) => {
  try {
    const [ body, userId, earlyAbortResponse ] = await requestHandler({ requireAuth: true, expectBody: true })(req);
    // If commonMiddleware produced a NextResponse(error response), terminate early
    if (earlyAbortResponse) return earlyAbortResponse;
    if (body.snippetCount >= 10) {
      return new NextResponse(JSON.stringify({ code: "LIMIT_REACHED" }), { status: 403 });
    }

    const snippetRepository = new PrismaSnippetRepository();
    const viewRepository = new PrismaViewRepository();
    const snippetUseCases = new SnippetUseCases(snippetRepository, viewRepository);
    const updatedSnippet = await snippetUseCases.updateSnippet(body.id, { ...body, userId } );

    // return new NextResponse(JSON.stringify(updatedSnippet), { status: 200 });
    return new Response(JSON.stringify({ status:'success', data: updatedSnippet }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error(e)
    return new Response(JSON.stringify({ code: "INTERNAL_SERVER_ERROR" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    // return new NextResponse(JSON.stringify({ code: "INTERNAL_SERVER_ERROR", detail: e.message }), { status: 500 });
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
    const viewRepository = new PrismaViewRepository();
    const snippetUseCases = new SnippetUseCases(snippetRepository, viewRepository);

    const createdSnippet = await snippetUseCases.createSnippet({ ...body, userId } );

    return new NextResponse(JSON.stringify(createdSnippet), { status: 200 });
  } catch (e) {
    console.error(e)
    return new Response(JSON.stringify({ code: "INTERNAL_SERVER_ERROR" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    // return new NextResponse(JSON.stringify({ code: "INTERNAL_SERVER_ERROR", detail: e.message }), { status: 500 });
  }
}

export const DELETE = async (req: NextRequest) => {
  try {
    const [ , userId, earlyAbortResponse ] = await requestHandler({ requireAuth: true, expectBody: false })(req);
    // If commonMiddleware produced a NextResponse(error response), terminate early
    if (earlyAbortResponse) return earlyAbortResponse;

    const snippetRepository = new PrismaSnippetRepository();
    const viewRepository = new PrismaViewRepository();
    const snippetUseCases = new SnippetUseCases(snippetRepository, viewRepository);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if(!id) {
      return new NextResponse(JSON.stringify({ message: "MISSING_ID" }), { status: 400 });
    }
    const deletedSnippet = await snippetUseCases.deleteSnippet(id as string, userId as string);


    // return new NextResponse(JSON.stringify(deletedSnippet), { status: 200 });
    return new Response(JSON.stringify({ status:'success', data:  deletedSnippet }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ code: "INTERNAL_SERVER_ERROR" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    // return new NextResponse(JSON.stringify({ code: "INTERNAL_SERVER_ERROR", detail: e.message }), { status: 500 });
  }
}
