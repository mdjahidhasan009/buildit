import { configureStore } from "@reduxjs/toolkit";
import componentsReducer from "@/lib/features/components/componentsSlice";
import uiReducer from "@/lib/features/ui/uiSlice";
import snippetReducer from "@/lib/features/snippet/snippetSlice";
import diagramReducer from "@/lib/features/diagram/diagramSlice";

export const store = configureStore({
  reducer: {
    components: componentsReducer,
    ui: uiReducer,
    snippet: snippetReducer,
    diagram: diagramReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;