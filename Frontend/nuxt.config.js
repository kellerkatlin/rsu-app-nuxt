// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
    devtools: {
        enabled: false
    },
    typescript: false,
    app: {
        head: {
            title: 'DRSU',
            link: [
                {
                    id: 'theme-css',
                    rel: 'stylesheet',
                    type: 'text/css',
                    href: '/themes/lara-light-indigo/theme.css'
                }
            ]
        }
    },
    modules: ['nuxt-primevue', '@pinia/nuxt', '@nuxtjs/tailwindcss'],
    primevue: {
        options: { ripple: true },
        components: {
            exclude: ['Editor']
        }
    },
    script: [
        {
            strategy: 'lazyOnload',
            src: 'https://www.googletagmanager.com/gtag/js?id=UA-93461466-1'
        },
        {
            id: 'ga-analytics',
            strategy: 'lazyOnload',
            children: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'UA-93461466-1');
                
            `
        }
    ],
    css: ['@/assets/styles.scss', 'primeicons/primeicons.css', 'primeflex/primeflex.scss', 'primevue/resources/primevue.min.css'],

    router: {
        middleware: ['auth']
    }
};
