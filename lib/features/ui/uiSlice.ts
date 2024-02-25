import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    setSidebarItemAndItemNameOfSelectedSidebarAndIsSidebarOpen: (state, action) => {
      state.isSidebarOpen = true;
      state.selectedSidebarItemName = action.payload.selectedSidebarItemName;
      state.selectedItemNameOfSidebar = action.payload.selectedItemNameOfSidebar;
    }
  },
});

export const { closeSidebar, setSidebarItemAndItemNameOfSelectedSidebarAndIsSidebarOpen } = uiSlice.actions;

export default uiSlice.reducer;
