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
    setRoutePath: (state, action: PayloadAction<string>) => {
      state.routePath = action.payload;
    },
    setIsDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isDialogOpen = action.payload;
    },
    setDialogProps: (state, action: PayloadAction<DialogProps>) => {
      state.dialogProps = action.payload;
    }
  }
});

export const { setIsDialogOpen, setDialogProps, setRoutePath } = contentSlice.actions;

export default contentSlice.reducer;
