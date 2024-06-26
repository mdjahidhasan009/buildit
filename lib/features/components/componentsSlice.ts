import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit';
import { initialState } from "@/lib/features/components/IComponent";
import {IDesignComponent} from "@/app/(design)/constants/Design";

export const componentsSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    addComponent: (state: Draft<typeof initialState>, action: PayloadAction<Partial<IDesignComponent>>) => {
      state.components.push(action.payload as IDesignComponent);
    },
    setCurrentComponent: (state: Draft<typeof initialState>, action) => {
      state.currentComponent = action.payload;
    },
    setComponents: (state: Draft<typeof initialState>, action) => {
      state.components = action.payload;
    },
    updateComponent: (state: Draft<typeof initialState>, action: PayloadAction<{ id: number; changes: Partial<IDesignComponent> }>) => {
      const { id, changes } = action.payload;
      const index = state.components.findIndex(component => component.id === id);
      if (index !== -1) {
        const updatedComponent = { ...state.components[index], ...changes };
        state.components[index] = updatedComponent;

        if (state.currentComponent && state.currentComponent.id === id) {
          state.currentComponent = updatedComponent;
        }
      }
    },
    removeComponent: (state: Draft<typeof initialState>, action: PayloadAction<number>) => {
      state.components = state.components.filter(component => component.id !== action.payload);
    },
    updateComponentPosition: (state: Draft<typeof initialState>, action: PayloadAction<{ id: number; left: number; top: number }>) => {
      const { id, left, top } = action.payload;
      const componentIndex = state.components.findIndex(component => component.id === id);
      if (componentIndex !== -1) {
        const updatedComponent = { ...state.components[componentIndex], left, top };
        state.components[componentIndex] = updatedComponent;
        if (state.currentComponent && state.currentComponent.id === id) {
          state.currentComponent = updatedComponent;
        }
      }
    },
    updateComponentSize: (state: Draft<typeof initialState>, action: PayloadAction<{ id: number; width: number; height: number }>) => {
      const { id, width, height } = action.payload;
      const index = state.components.findIndex(component => component.id === id);
      if (index !== -1) {
        const updatedComponent = { ...state.components[index], width, height };
        state.components[index] = updatedComponent;
        if (state.currentComponent && state.currentComponent.id === id) {
          state.currentComponent = updatedComponent;
        }
      }
    },
    updateComponentRotation: (state: Draft<typeof initialState>, action: PayloadAction<{ id: number; rotate: number }>) => {
      const { id, rotate } = action.payload;
      const index = state.components.findIndex(component => component.id === id);
      if (index !== -1) {
        const updatedComponent = { ...state.components[index], rotate };
        state.components[index] = updatedComponent;
        if (state.currentComponent && state.currentComponent.id === id) {
          state.currentComponent = updatedComponent;
        }
      }
    },
  },
});

export const { addComponent, updateComponent,
  removeComponent, setComponents,
  updateComponentPosition, updateComponentSize,
  updateComponentRotation, setCurrentComponent
} = componentsSlice.actions;
export default componentsSlice.reducer;
