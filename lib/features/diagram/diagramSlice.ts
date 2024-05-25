import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Diagram} from "@/core/domain/entities/Diagram";

interface IInitialState {
    title: string;
    diagrams: Diagram[] | [];
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
        setAllDiagrams: (state, action: PayloadAction<{ diagrams: Diagram[] }>) => {
            const { diagrams } = action.payload;
            state.diagrams = diagrams;
        },
        setTittle:(state, action) => {
            const { data } = action.payload;
            state.title = data;
        },
        setEditorData:(state, action) => {
            const { data } = action.payload;
            state.editorData = data;
        },
        setDiagramData:(state, action) => {
            const { data } = action.payload;
            const { elements } = data;
            state.diagramData = {
                ...state.diagramData,
                    elements
            };
        },
        initDiagramData: (state, action) => {
            const { data } = action.payload;
            const { title, editorData, elements } = data;

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