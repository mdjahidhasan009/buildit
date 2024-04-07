import { PrismaClient } from "@prisma/client";
import { IDiagramRepository } from "@/core/application/ports/IDiagramRepository";
import { Diagram } from "@/core/domain/entities/Diagram";

const prisma = new PrismaClient();

export class PrismaDiagramRepository implements IDiagramRepository {
    async create(diagramData: Partial<Diagram> & { userId: string, fileName: string; editorData: object, diagramData: object }): Promise<Diagram> {
        const createdDiagram = await prisma.diagram.create({
            data: diagramData,
        })
        return createdDiagram as Diagram;
    };

    async update(id: string, diagramData: Partial<Diagram>): Promise<Diagram> {
        const updatedDiagram = await prisma.diagram.update({
            where: { id },
            data: diagramData
        })

        return updatedDiagram as Diagram;
    }

    async getById(id: string): Promise<Diagram | null> {
        const diagram = await prisma.diagram.findUnique({
            where: { id }
        });

        return diagram as Diagram;
    }

    async delete(id: string): Promise<void> {
        await prisma.diagram.delete({
            where: { id },
        })
    }

    async getAll(): Promise<Diagram[]> {
        const diagrams = await prisma.diagram.findMany();
        return diagrams as Diagram[];
    }
}