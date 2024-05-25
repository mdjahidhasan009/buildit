import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ContentCardType, DialogProps} from "@/components/shared/ContentCard/type";

interface ContentState {
  type: ContentCardType | "";
  routePath?: string;
  isDialogOpen: boolean;
  dialogProps: DialogProps | null;
}

const initialState: ContentState = {
  type: "",
  routePath: "",
  isDialogOpen: false,
  dialogProps: null,
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setRoutePath: (state, action: PayloadAction<{ routePath: string }>) => {
      const { routePath } = action.payload;
      state.routePath = routePath;
    },
    setIsDialogOpen: (state, action: PayloadAction<{ value: boolean }>) => {
      const { value } = action.payload;
      state.isDialogOpen = value;
    },
    setDialogProps: (state, action) => {
      const { value } = action.payload;
      state.dialogProps = value;
    }
  }
});

export const { setIsDialogOpen, setDialogProps, setRoutePath } = contentSlice.actions;

export default contentSlice.reducer;
