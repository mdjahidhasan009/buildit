export interface Diagram {
    id: string;
    userId: string;
    fileName: string;
    editorData: object;
    diagramData: object;
    createdAt: Date;
    updatedAt: Date;
}