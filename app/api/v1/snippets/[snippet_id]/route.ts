import {NextRequest, NextResponse} from "next/server";
import {requestHandler} from "@/utils/requestHandlerFactory";
import {PrismaSnippetRepository} from "@/infrastructure/adapters/prismaSnippetRepository";
import {SnippetUseCases} from "@/core/application/use-cases/snippetUseCases";

export const GET = async (req: NextRequest, params: {params: { snippet_id: string }}) => {
  try {
    const [_, userId ='', earlyAbortResponse] = await requestHandler({ requireAuth: true, expectBody: false })(req);
    if(earlyAbortResponse && earlyAbortResponse.status !== 403) return earlyAbortResponse; //as it can be use publicly also

    const snippetId = params?.params?.snippet_id as string;
    if(!snippetId) throw new Error("Snippet ID is required");

    const snippetRepository = new PrismaSnippetRepository();
    const snippetUseCases = new SnippetUseCases(snippetRepository);
    const snippet = await snippetUseCases.getSnippetById(snippetId, userId);

    return new NextResponse(JSON.stringify(snippet), { status: 200 });
  } catch (e) {
    console.error(e);
  }
}