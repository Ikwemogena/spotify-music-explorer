export default defineNuxtRouteMiddleware(() => {
    const { accessToken } = useAccessToken();
    if (!accessToken) {
        console.log('no access token')
        return navigateTo('/login')
    }
})