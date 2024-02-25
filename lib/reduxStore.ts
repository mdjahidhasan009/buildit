import { configureStore } from "@reduxjs/toolkit";
import componentsReducer from "@/lib/features/components/componentsSlice";
import uiReducer from "@/lib/features/ui/uiSlice";

export const store = configureStore({
  reducer: {
    components: componentsReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;