import { PrismaClient, Prisma } from "@prisma/client";
import { IDiagramRepository } from "@/core/application/ports/IDiagramRepository";
import { IDiagramEntry } from "@/core/domain/entities/Diagram";

const prisma = new PrismaClient();

export class PrismaDiagramRepository implements IDiagramRepository {
    async create(diagramData: Partial<IDiagramEntry> & { userId: string } ): Promise<IDiagramEntry> {
        const createdDiagram = await prisma.diagram.create({
            data: {
                ...diagramData,
                editorData: diagramData.editorData ?? {},
                diagramData: diagramData.diagramData ?? {},
            }
        })
        return createdDiagram;
    };

    async update(id: string, diagramData: Partial<IDiagramEntry>): Promise<IDiagramEntry> {
        const updatedDiagram = await prisma.diagram.update({
            where: { id },
            data: {
                ...diagramData,
                editorData: diagramData.editorData ?? {},
                diagramData: diagramData.diagramData ?? {},
            }
        })

        return updatedDiagram;
    }

    async getById(id: string): Promise<IDiagramEntry | null> {
        const diagram = await prisma.diagram.findUnique({
            where: { id }
        });

        return diagram;
    }

    async delete(id: string): Promise<IDiagramEntry> {
        const deletedDiagram = await prisma.diagram.delete({
            where: { id },
        })

        return deletedDiagram;
    }

    async getAll(): Promise<IDiagramEntry[]> {
        const diagrams = await prisma.diagram.findMany();
        return diagrams;
    }

    async getAllOfUser(userId: string): Promise<IDiagramEntry[]> {
        const diagrams = await prisma.diagram.findMany({
            where: { userId }
        });
        return diagrams;
    }
}