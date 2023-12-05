import { defineStore } from 'pinia';

export const useAuth = defineStore({
  id: 'main',
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    login() {
      // Aquí debes implementar la lógica de autenticación
      // Si la autenticación es exitosa, cambia el estado a true
      this.isAuthenticated = false;
    },
    logout() {
      // Aquí debes implementar la lógica de cierre de sesión
      // Cuando el usuario cierra la sesión, cambia el estado a false
      this.isAuthenticated = false;
    }
  }
});