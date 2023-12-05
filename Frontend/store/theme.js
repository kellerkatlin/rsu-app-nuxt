// store/theme.js
import { defineStore } from 'pinia';

export const useThemeStore = defineStore({
  id: 'theme',
  state: () => ({
    theme: 'lara-dark-indigo', 
  }),
  actions: {
    setTheme(theme) {
      this.theme = theme;
    },
  },
});