import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from 'react-redux';

import componentsReducer from "@/lib/features/components/componentsSlice";
import uiReducer from "@/lib/features/ui/uiSlice";
import snippetReducer from "@/lib/features/snippet/snippetSlice";
import diagramReducer from "@/lib/features/diagram/diagramSlice";
import contentReducer from "@/lib/features/content/contentSlice";

export const reduxStore = configureStore({
  reducer: {
    components: componentsReducer,
    ui: uiReducer,
    snippet: snippetReducer,
    diagram: diagramReducer,
    content: contentReducer,
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

export const useDispatch = () => useDispatchBase<AppDispatch>();

export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelectorBase<RootState, TSelected>(selector);