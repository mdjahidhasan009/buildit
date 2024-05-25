import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState, IComponent } from "@/lib/features/components/IComponent";

export const componentsSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    addComponent: (state, action: PayloadAction<Partial<IComponent>>) => {
      state.components.push(action.payload as IComponent);
    },
    setCurrentComponent: (state, action) => {
      state.currentComponent = action.payload;
    },
    setComponents: (state, action) => {
      state.components = action.payload;
    },
    updateComponent: (state, action: PayloadAction<{ id: number; changes: Partial<IComponent> }>) => {
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
    removeComponent: (state, action: PayloadAction<number>) => {
      state.components = state.components.filter(component => component.id !== action.payload);
    },
    updateComponentPosition: (state, action: PayloadAction<{ id: number; left: number; top: number }>) => {
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
    updateComponentSize: (state, action: PayloadAction<{ id: number; width: number; height: number }>) => {
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
    updateComponentRotation: (state, action: PayloadAction<{ id: number; rotate: number }>) => {
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
