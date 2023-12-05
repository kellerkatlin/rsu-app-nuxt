export default defineNuxtRouteMiddleware((to, from) => {
    if (process.client) {
        const auth = localStorage.getItem('auth._token.local');
        if (!auth && to.path !== '/auth/login') {
            return navigateTo('/auth/login');
        }
    }
});