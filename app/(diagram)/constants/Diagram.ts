import { Diagram } from "@/types";

export interface IDiagram extends Diagram {
  diagramData: {
    elements: any[];
  }
}