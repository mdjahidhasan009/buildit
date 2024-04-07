import {Diagram} from "@/core/domain/entities/Diagram";

export interface IDiagramRepository {
    create(diagramData: Partial<Diagram> & { userId: string }): Promise<Diagram>;
    update(id: string, diagramData: Partial<Diagram>): Promise<Diagram>;
    getById(id: string): Promise<Diagram | null>;
    delete(id: string): void;
    getAll(): Promise<Diagram[]>;
}