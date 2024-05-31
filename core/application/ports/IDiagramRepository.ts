import {IDiagramEntry} from "@/core/domain/entities/Diagram";

export interface IDiagramRepository {
    create(diagramData: Partial<IDiagramEntry> & { userId: string }): Promise<IDiagramEntry>;
    update(id: string, diagramData: Partial<IDiagramEntry>): Promise<IDiagramEntry>;
    getById(id: string): Promise<IDiagramEntry | null>;
    delete(id: string): Promise<IDiagramEntry>;
    getAll(): Promise<IDiagramEntry[]>;
    getAllOfUser(userId: string): Promise<IDiagramEntry[]>;
}