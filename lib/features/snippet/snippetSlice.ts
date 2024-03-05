import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DEFAULT_VALUES} from "@/lib/values";
import {find} from "@/lib/find";
import {SUPPORTED_LANGUAGES} from "@/lib/languages";
import {SUPPORTED_THEMES} from "@/lib/themes";
import {SUPPORTED_FONT_STYLES} from "@/lib/fonts";
import {ISnippet} from "@/components/Snippet/ISnippet";

const initialState = {
  ...DEFAULT_VALUES,
  customColors: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    update: (state, action) => {
      const { type, value } = action.payload;
      if(type === 'message') {
        // console.log(type, value)
      }
      state[type] = value;
    },
    setAppState: (state, action: PayloadAction<ISnippet>) => {
      const snippet = action.payload;
      state.message = DEFAULT_VALUES.message;
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
      state.customColors = snippet.customColors;
      state.colorMode = snippet.colorMode;
      state.angle = snippet.angle;
      state.grain = snippet.grain;
    },
    setCustomColor: (state, action) => {
      const { color, index } = action.payload;
      state.customColors[index] = color;
    },
    addCustomColor: (state, action) => {
      state.customColors.push(action.payload);
    },
    removeCustomColor: (state, action) => {
      state.customColors.splice(action.payload, 1);
    },
  },
});

export const { update, setAppState, setCustomColor, addCustomColor, removeCustomColor } = appSlice.actions;

export default appSlice.reducer;
