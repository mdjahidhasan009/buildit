import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DEFAULT_VALUES} from "@/lib/values";
import {find} from "@/lib/find";
import {SUPPORTED_THEMES} from "@/lib/themes";
import {SUPPORTED_FONT_STYLES} from "@/lib/fonts";
import {ISnippet} from "@/app/(code)/constants/ISnippet";
import {AppState} from "@/lib/types";

const initialState: AppState = {
  ...DEFAULT_VALUES
};

type UpdateActionPayload = {
  type: keyof AppState;
  value: AppState[keyof AppState];
};

type UpdateCustomColorsPayload = Pick<AppState, 'customColors'>;

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
      const snippet = action.payload;
      state.message = DEFAULT_VALUES.message;
      // state.hasCustomTheme = Boolean(snippet.theme === "custom") || DEFAULT_VALUES.hasCustomTheme;
      state.hasCustomTheme = Boolean(snippet.theme === "custom") || DEFAULT_VALUES.hasCustomTheme;
      state.id = snippet.id;
      state.title = snippet.title;
      state.code = snippet.code;
      // state.language = find(SUPPORTED_LANGUAGES, snippet.language);
      state.language = snippet.language;
      state.theme = find(SUPPORTED_THEMES, snippet.theme);
      state.fontFamily = find(SUPPORTED_FONT_STYLES, snippet.fontFamily);
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
    // setCustomColor: (state, action) => {
    //   const { color, index } = action.payload;
    //   console.log(state);
    //   state.customColors[index] = color;
    // },
    setCustomColor(state, action: PayloadAction<{ index: number; color: string }>) {
      const { index, color } = action.payload;
      // Make sure the index is within the bounds of the customColors array
      if (index >= 0 && index < state.customColors.length) {
        state.customColors[index] = color;
      }
    },
    // addCustomColor: (state, action) => {
    //   const { color } = action.payload;
    //   state.customColors.push(color);
    // },
    addCustomColor(state, action: PayloadAction<{ color: string }>) {
      const { color } = action.payload;
      state.customColors.push(color);
    },
    // removeCustomColor: (state, action) => {
    //   const { index } = action.payload;
    //   state.customColors.splice(index, 1);
    //   // state.customColors.splice(0, state.customColors.length, ...(snippet.customColors ?? []));
    //
    // },
    removeCustomColor(state, action: PayloadAction<{ index: number }>) {
      const { index } = action.payload;
      state.customColors.splice(index, 1);
    },
  },
});

export const { update, setAppState, setCustomColor, addCustomColor, removeCustomColor } = appSlice.actions;

export default appSlice.reducer;
