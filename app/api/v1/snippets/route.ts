import { NextRequest, NextResponse } from "next/server";
import {SnippetUseCases} from "@/core/application/use-cases/snippetUseCases";
import {PrismaSnippetRepository} from "@/infrastructure/adapters/prismaSnippetRepository";
import {getUserId} from "@/utils/authUtils";
import {extractBodyFromRequest} from "@/utils/requestHelpers";

export const GET = async (req: NextRequest) => {
  try {
    const { userId, response } = await getUserId();
    if (!userId) return response;

    const snippetRepository = new PrismaSnippetRepository();
    const snippetUseCases = new SnippetUseCases(snippetRepository);
    const snippet = await snippetUseCases.getSnippets(userId as string);

    return new NextResponse(JSON.stringify(snippet), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ code: "INTERNAL_SERVER_ERROR" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

}
export const PATCH = async (req: NextRequest) => {
  try {
    const { userId, response } = await getUserId();
    if (!userId) return response;

    let body = await extractBodyFromRequest(req);
    if(!body) {
      return new Response(JSON.stringify({ status: 'error', message: 'Please add the body' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    if (body?.snippetCount >= 10) {
      return new NextResponse(JSON.stringify({ code: "LIMIT_REACHED" }), { status: 403 });
    }

    const snippetRepository = new PrismaSnippetRepository();
    const snippetUseCases = new SnippetUseCases(snippetRepository);
    const updatedSnippet = await snippetUseCases.updateSnippet(body.id, { ...body, userId } );

    return new Response(JSON.stringify({ status:'success', data: updatedSnippet }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error(e)
    return new Response(JSON.stringify({ code: "INTERNAL_SERVER_ERROR" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const { userId, response } = await getUserId();
    if (!userId) return response;

    let body = await extractBodyFromRequest(req);
    if(!body) {
      return new Response(JSON.stringify({ status: 'error', message: 'Please add the body' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    if (body?.snippetCount >= 10) {
      return new NextResponse(JSON.stringify({ code: "LIMIT_REACHED" }), { status: 403 });
    }

    const snippetRepository = new PrismaSnippetRepository();
    const snippetUseCases = new SnippetUseCases(snippetRepository);

    const createdSnippet = await snippetUseCases.createSnippet({ ...body, userId } );

    return new NextResponse(JSON.stringify(createdSnippet), { status: 200 });
  } catch (e) {
    console.error(e)
    return new Response(JSON.stringify({ code: "INTERNAL_SERVER_ERROR" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}

export const DELETE = async (req: NextRequest) => {
  try {
    const { userId, response } = await getUserId();
    if (!userId) return response;

    const snippetRepository = new PrismaSnippetRepository();
    const snippetUseCases = new SnippetUseCases(snippetRepository);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if(!id) {
      return new NextResponse(JSON.stringify({ message: "MISSING_ID" }), { status: 400 });
    }
    const deletedSnippet = await snippetUseCases.deleteSnippet(id as string, userId as string);
    return new Response(JSON.stringify({ status:'success', data:  deletedSnippet }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ code: "INTERNAL_SERVER_ERROR" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}
