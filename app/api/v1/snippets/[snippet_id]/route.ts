import {NextRequest, NextResponse} from "next/server";
import {requestHandler} from "@/utils/requestHandlerFactory";
import {PrismaSnippetRepository} from "@/infrastructure/adapters/prismaSnippetRepository";
import {SnippetUseCases} from "@/core/application/use-cases/snippetUseCases";
import {PrismaViewRepository} from "@/infrastructure/adapters/prismaViewRepository";

export const GET = async (req: NextRequest, params) => {
  try {
    const [_, userId ='', earlyAbortResponse] = await requestHandler({ requireAuth: true, expectBody: false })(req);
    // if(earlyAbortResponse) return earlyAbortResponse; //as it can be use publically also

    // console.log(params);
    const snippetId = params?.params?.snippet_id as string;
    // console.log(snippetId)
    if(!snippetId) throw new Error("Snippet ID is required");

    const snippetRepository = new PrismaSnippetRepository();
    const viewRepository = new PrismaViewRepository();
    const snippetUseCases = new SnippetUseCases(snippetRepository, viewRepository);
    const snippet = await snippetUseCases.getSnippetById(snippetId, userId);

    // if(snippet?.userId !== userId) {
    //   return new NextResponse(JSON.stringify({ code: "UNAUTHORIZED" }), { status: 403 });
    // }
    // console.log(snippet);

    return new NextResponse(JSON.stringify(snippet), { status: 200 });
  } catch (e) {
    console.error(e);
  }
}