import {NextRequest, NextResponse} from "next/server";
import {requestHandler} from "@/utils/requestHandlerFactory";
import {PrismaDiagramRepository} from "@/infrastructure/adapters/PrismaDiagramRepository";
import {DiagramUseCases} from "@/core/application/use-cases/DiagramUseCases";
import {diagramSlice} from "@/lib/features/diagram/diagramSlice";

export const GET = async (req: NextRequest, params: {params: { fileId: string }}) => {
    const [_, userId ='', earlyAbortResponse] =
        await requestHandler({ requireAuth: true, expectBody: false })(req);
    if(earlyAbortResponse && earlyAbortResponse.status !== 403) return earlyAbortResponse; //as it can be use publicly also


    const fileId = params?.params?.fileId as string;
    if(!fileId) {
        return new Response(JSON.stringify({ status: 'error', data: [], message: "Please provide fileId" }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    const diagramRepository = new PrismaDiagramRepository();
    const diagramUseCase = new DiagramUseCases(diagramRepository);

    const diagram = await diagramUseCase.getById(fileId);

    return new Response(JSON.stringify({ status: 'success', data: { diagram } }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
