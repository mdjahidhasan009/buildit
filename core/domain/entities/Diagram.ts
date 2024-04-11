export interface Diagram {
    id: string;
    userId: string;
    title?: string;
    editorData?: object;
    diagramData?: object;
    createdAt: Date;
    updatedAt: Date;
}