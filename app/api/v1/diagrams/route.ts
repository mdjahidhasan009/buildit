import { PrismaDiagramRepository } from "@/infrastructure/adapters/PrismaDiagramRepository";
import { DiagramUseCases } from "@/core/application/use-cases/DiagramUseCases";
import { requestHandler } from "@/utils/requestHandlerFactory";
import {NextRequest, NextResponse} from "next/server";
import {PrismaSnippetRepository} from "@/infrastructure/adapters/prismaSnippetRepository";
import {PrismaViewRepository} from "@/infrastructure/adapters/prismaViewRepository";
import {SnippetUseCases} from "@/core/application/use-cases/snippetUseCases";

export const GET = async (req: NextRequest) => {
    const [ body, userId, earlyAbortResponse ] = await requestHandler({ requireAuth: true, expectBody: false })(req);
    if (earlyAbortResponse) {
        return earlyAbortResponse;
    }

    if(!userId) {
        return new Response(JSON.stringify({ status: 'error', message: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    const diagramRepository = new PrismaDiagramRepository();
    const diagramUseCases = new DiagramUseCases(diagramRepository);
    const diagrams = await diagramUseCases.getAllOfUser(userId);

    // return new NextResponse(JSON.stringify(diagrams), { status: 200 });
    return new Response(JSON.stringify({ status: 'success', data: { diagrams } }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    // return new Response(JSON.stringify({ status:'success', data: { diagrams } }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
export const POST = async (req: NextRequest) => {
    const [ body, userId, earlyAbortResponse ] = await requestHandler({ requireAuth: true, expectBody: true })(req);
    // If commonMiddleware produced a NextResponse(error response), terminate early
    if (earlyAbortResponse) return earlyAbortResponse;

    const diagramRepository = new PrismaDiagramRepository();
    const diagramUseCase = new DiagramUseCases(diagramRepository);

    const createdDiagram = await diagramUseCase.create({ ...body, userId });

    return new NextResponse(JSON.stringify(createdDiagram), { status: 200 });
}

export const PATCH = async (req: NextRequest) => {
    const [body, userId ='', earlyAbortResponse] =
        await requestHandler({ requireAuth: true, expectBody: true })(req);
    if(earlyAbortResponse && earlyAbortResponse.status !== 403) return earlyAbortResponse; //as it can be use publicly also

    if(!userId) {
        return new Response(JSON.stringify({ stats: 'error', message: "Unauthorized"}), { status: 401, headers: { 'Content-Type': 'application-json' }});
    }
    const id = body?.id;
    if(!id) {
        return new Response(JSON.stringify({ status: 'error', message: 'Please add the id' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    const dialogRepository = new PrismaDiagramRepository();
    const diagramUseCase = new DiagramUseCases(dialogRepository);
    const diagram = await diagramUseCase.getById(id);
    if(diagram?.userId !== userId) {
        return new Response(JSON.stringify({ status: 'error', message: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    const updatedDiagram = await diagramUseCase.update(id, body);
    return new Response(JSON.stringify({ status:'success', data: updatedDiagram }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}

export const DELETE = async (req: NextRequest) => {
    try {
        const [ , userId, earlyAbortResponse ] = await requestHandler({ requireAuth: true, expectBody: false })(req);
        // If commonMiddleware produced a NextResponse(error response), terminate early
        if (earlyAbortResponse) return earlyAbortResponse;

        const diagramRepository = new PrismaDiagramRepository();
        const diagramUseCase = new DiagramUseCases(diagramRepository);
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if(!id) {
            return new Response(JSON.stringify({ status: 'error', message: 'Please add the id' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }
        const diagram = await diagramUseCase.getById(id);
        if(diagram?.userId !== userId) {
            return new Response(JSON.stringify({ status: 'error', message: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
        }

        const deletedDiagram = await diagramUseCase.delete(id);
        return new Response(JSON.stringify({ status:'success', data: deletedDiagram }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({ code: "INTERNAL_SERVER_ERROR" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        // return new NextResponse(JSON.stringify({ code: "INTERNAL_SERVER_ERROR", detail: e.message }), { status: 500 });
    }
}