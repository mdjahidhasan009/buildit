import {PrismaDiagramRepository} from "@/infrastructure/adapters/PrismaDiagramRepository";
import {DiagramUseCases} from "@/core/application/use-cases/DiagramUseCases";
import {requestHandler} from "@/utils/requestHandlerFactory";
import {NextResponse} from "next/server";

export const POST = async (req: NextRequest) => {
    const [ body, userId, earlyAbortResponse ] = await requestHandler({ requireAuth: true, expectBody: true })(req);
    // If commonMiddleware produced a NextResponse(error response), terminate early
    if (earlyAbortResponse) return earlyAbortResponse;

    const diagramRepository = new PrismaDiagramRepository();
    const diagramUseCase = new DiagramUseCases(diagramRepository);

    const createdDiagram = await diagramUseCase.create({ ...body, userId });

    return new NextResponse(JSON.stringify(createdDiagram), { status: 200 });
}