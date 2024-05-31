import {IDiagramRepository} from "@/core/application/ports/IDiagramRepository";
import {IDiagramEntry} from "@/core/domain/entities/Diagram";

export class DiagramUseCases {
    constructor(private diagramRepository : IDiagramRepository) {}

    async create (diagramData: Partial<IDiagramEntry> & { userId: string }): Promise<IDiagramEntry> {
        const allDiagramOfUser = await this.diagramRepository.getAllOfUser(diagramData?.userId);

        const countOfDiagramOfUser = allDiagramOfUser.length;
        if(countOfDiagramOfUser >= 10) {
            throw new Error('You have reached the limit of 10 diagrams per user');
        }

        return await this.diagramRepository.create(diagramData);
    }

    async update(id: string, diagramData: Partial<IDiagramEntry>): Promise<IDiagramEntry> {
        return await this.diagramRepository.update(id, diagramData);
    }

    async getById(id: string): Promise<IDiagramEntry | null> {
        return await this.diagramRepository.getById(id);
    }

    async delete(id: string): Promise<IDiagramEntry> {
        return await this.diagramRepository.delete(id);
    }

    async getAll(): Promise<IDiagramEntry[]> {
        return await this.diagramRepository.getAll();
    }

    async getAllOfUser(userId: string): Promise<IDiagramEntry[]> {
        return await this.diagramRepository.getAllOfUser(userId);
    }
}