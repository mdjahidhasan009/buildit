import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {DEFAULT_VALUES} from "@/lib/values";
import {ISnippet} from "@/app/(code)/constants/ISnippet";
import {AppState} from "@/lib/types";

const initialState: AppState = {
  ...DEFAULT_VALUES
};

type UpdateActionPayload = {
  type: keyof AppState;
  value: AppState[keyof AppState];
};


export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<UpdateActionPayload>) => {
      const { type, value } = action.payload;
      if (type in state) {
        (state as any)[type] = value;
      } else {
        console.warn(`No such property "${type}" in state`);
      }
    },
    setAppState: (state, action: PayloadAction<ISnippet>) => {
      const snippet : ISnippet = action.payload;
      state.message = DEFAULT_VALUES.message;
      state.hasCustomTheme = Boolean(snippet.theme === "custom") || DEFAULT_VALUES.hasCustomTheme;
      state.id = snippet.id;
      state.title = snippet.title;
      state.code = snippet.code;
      state.language = snippet.language;
      state.theme = snippet.theme;
      state.fontFamily = snippet.fontFamily;
      state.fontSize = snippet.fontSize;
      state.lineNumbers = snippet.lineNumbers;
      state.padding = snippet.padding;
      if (snippet.customColors && Array.isArray(snippet.customColors)) {
        state.customColors = snippet.customColors;
      } else {
        state.customColors = [''];
      }
      state.colorMode = snippet.colorMode;
      state.angle = snippet.angle;
      state.grain = snippet.grain;
    },
    setAllSnippets: (state, action: PayloadAction<ISnippet[]>) => {
      state.allSnippets = action.payload;
    },
    setCustomColor(state, action: PayloadAction<{ index: number; color: string }>) {
      const { index, color } = action.payload;
      if (index >= 0 && index < state.customColors.length) {
        state.customColors[index] = color;
      }
    },
    addCustomColor(state, action: PayloadAction<string>) {
      state.customColors.push(action.payload);
    },
    removeCustomColor(state, action: PayloadAction<{ index: number }>) {
      const { index } = action.payload;
      state.customColors.splice(index, 1);
    },
  },

});

export const { update, setAppState, setCustomColor,
  addCustomColor, removeCustomColor, setAllSnippets
} = appSlice.actions;

export default appSlice.reducer;
