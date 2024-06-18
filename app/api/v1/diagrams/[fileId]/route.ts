import {NextRequest} from "next/server";
import {PrismaDiagramRepository} from "@/infrastructure/adapters/PrismaDiagramRepository";
import {DiagramUseCases} from "@/core/application/use-cases/DiagramUseCases";

export const GET = async (req: NextRequest, params: {params: { fileId: string }}) => {
    const fileId = params?.params?.fileId as string;
    if(!fileId) {
        return new Response(JSON.stringify({ status: 'error', data: [], message: "Please provide fileId" }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    const diagramRepository = new PrismaDiagramRepository();
    const diagramUseCase = new DiagramUseCases(diagramRepository);

    const diagram = await diagramUseCase.getById(fileId);

    return new Response(JSON.stringify({ status: 'success', data: { diagram } }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
