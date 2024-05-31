import { IDiagram } from "@/app/(diagram)/constants/Diagram";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IInitialState {
    title: string;
    diagrams: IDiagram[] | [];
    editorData: any;
    diagramData: {
        elements: any[];
    }
}

const initialState: IInitialState = {
    title: "",
    diagrams: [],
    editorData: {},
    diagramData: {
        elements: []
    },
}

export const diagramSlice = createSlice({
    name: 'diagram',
    initialState,
    reducers: {
        setAllDiagrams: (state, action: PayloadAction<IDiagram[]>) => {
            state.diagrams = action.payload;
        },
        setTittle:(state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setEditorData:(state, action: PayloadAction<any>) => {
            state.editorData = action.payload;
        },
        setDiagramData:(state, action: PayloadAction<any>) => {
            const elements = action.payload || [];
            state.diagramData = {
                ...state.diagramData,
                    elements
            };
        },
        initDiagramData: (state, action: PayloadAction<{ title: string, editorData: any, elements: any[]}>) => {
            const { title, editorData, elements } = action.payload;

            state.title = title;
            state.editorData = editorData;
            state.diagramData = {
                ...state.diagramData,
                elements
            };
        }
    }
})

export const { setTittle, setEditorData, setDiagramData,
    initDiagramData, setAllDiagrams
} = diagramSlice.actions;
export default diagramSlice.reducer;