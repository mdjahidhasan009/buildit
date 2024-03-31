import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    editorData: {},
    diagramData: {}
}

export const diagramSlice = createSlice({
    name: 'diagram',
    initialState,
    reducers: {
        setEditorData:(state, action) => {
            const { data } = action.payload;
            state.editorData = data;
        },
        setDiagramData:(state, action) => {
            const { data } = action.payload;
            state.diagramData = data;
        }
    }
})

export const { setEditorData, setDiagramData } = diagramSlice.actions;
export default diagramSlice.reducer;