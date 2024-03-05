import { configureStore } from "@reduxjs/toolkit";
import componentsReducer from "@/lib/features/components/componentsSlice";
import uiReducer from "@/lib/features/ui/uiSlice";
import snippetReducer from "@/lib/features/snippet/snippetSlice";

export const store = configureStore({
  reducer: {
    components: componentsReducer,
    ui: uiReducer,
    snippet: snippetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;