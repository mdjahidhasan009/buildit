import { PrismaDiagramRepository } from "@/infrastructure/adapters/PrismaDiagramRepository";
import { DiagramUseCases } from "@/core/application/use-cases/DiagramUseCases";
import {NextRequest, NextResponse} from "next/server";
import {getUserId} from "@/utils/authUtils";
import {extractBodyFromRequest} from "@/utils/requestHelpers";

export const GET = async (req: NextRequest) => {
    const { userId, response } = await getUserId();
    if (!userId) return response;

    const diagramRepository = new PrismaDiagramRepository();
    const diagramUseCases = new DiagramUseCases(diagramRepository);
    const diagrams = await diagramUseCases.getAllOfUser(userId);

    return new Response(JSON.stringify({ status: 'success', data: { diagrams } }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
export const POST = async (req: NextRequest) => {
    const { userId, response } = await getUserId();
    if (!userId) return response;

    let body = await extractBodyFromRequest(req);
    if(!body) {
        return new Response(JSON.stringify({ status: 'error', message: 'Please add the body' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    const diagramRepository = new PrismaDiagramRepository();
    const diagramUseCase = new DiagramUseCases(diagramRepository);

    const createdDiagram = await diagramUseCase.create({ ...body, userId });

    return new NextResponse(JSON.stringify(createdDiagram), { status: 200 });
}

export const PATCH = async (req: NextRequest) => {
    const { userId, response } = await getUserId();
    if (!userId) return response;

    let body = await extractBodyFromRequest(req);
    if(!body) {
        return new Response(JSON.stringify({ status: 'error', message: 'Please add the body' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
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
        const { userId, response } = await getUserId();
        if (!userId) return response;

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
    }
}