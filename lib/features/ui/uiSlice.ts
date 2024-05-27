import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IInitialState {
  isSidebarOpen: boolean;
  selectedSidebarItemName: string;
  selectedItemNameOfSidebar: string;
}

const initialState: IInitialState = {
  isSidebarOpen: false,
  selectedSidebarItemName: '',
  selectedItemNameOfSidebar: '',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
      state.selectedSidebarItemName = '';
      state.selectedItemNameOfSidebar = '';
    },
    setSidebarItemAndItemNameOfSelectedSidebarAndIsSidebarOpen: (state, action: PayloadAction<{
      selectedSidebarItemName: string;
      selectedItemNameOfSidebar: string;
    }>) => {
      state.isSidebarOpen = true;
      state.selectedSidebarItemName = action.payload.selectedSidebarItemName;
      state.selectedItemNameOfSidebar = action.payload.selectedItemNameOfSidebar;
    }
  },
});

export const { closeSidebar, setSidebarItemAndItemNameOfSelectedSidebarAndIsSidebarOpen } = uiSlice.actions;

export default uiSlice.reducer;
