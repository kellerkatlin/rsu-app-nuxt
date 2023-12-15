// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {
        enabled: false
    },
    buildModules: ['@nuxtjs/tailwindcss'],
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
        },
    },
    modules: ['nuxt-primevue', '@pinia/nuxt', '@nuxtjs/tailwindcss', 'shadcn-nuxt'],
    primevue: {
        options: {
            ripple: true,
            locale: {
                startsWith: 'Comience con',
                contains: 'Contenga',
                notContains: 'No contenga',
                endsWith: 'Termine con',
                equals: 'Igual a',
                notEquals: 'Diferente a',
                noFilter: 'Sin filtro',
                lt: 'Menor que',
                lte: 'Menor o igual a',
                gt: 'Mayor que',
                gte: 'Mayor o igual a',
                dateIs: 'Fecha igual a',
                dateIsNot: 'Fecha diferente a',
                dateBefore: 'Fecha antes de',
                dateAfter: 'Fecha después de',
                custom: 'Personalizar',
                clear: 'Limpiar',
                apply: 'Aplicar',
                matchAll: 'Coincidir todo',
                matchAny: 'Coincidir con cualquiera',
                addRule: 'Agregar regla',
                removeRule: 'Eliminar regla',
                accept: 'Sí',
                reject: 'No',
                choose: 'Escoger',
                upload: 'Subir',
                cancel: 'Cancelar',
                fileSizeTypes: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
                dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                today: 'Hoy',
                now: 'Ahora',
                weekHeader: 'Sem',
                firstDayOfWeek: 1,
                showMonthAfterYear: false,
                dateFormat: 'dd/mm/yy',
                weak: 'Débil',
                medium: 'Medio',
                strong: 'Fuerte',
                passwordPrompt: 'Escriba una contraseña',
                emptyFilterMessage: 'Sin opciones disponibles',
                emptySearchMessage: 'Sin opciones disponibles',
                emptyMessage: 'No se han encontrado resultados',
                aria: {
                    trueLabel: 'Verdadero',
                    falseLabel: 'Falso',
                    nullLabel: 'No seleccionado',
                    star: '1 estrella',
                    stars: '{star} estrellas',
                    selectAll: 'Seleccionar todos',
                    unselectAll: 'Deseleccionar todos',
                    close: 'Cerrar',
                    previous: 'Anterior',
                    next: 'Siguiente',
                    navigation: 'Navegación',
                    scrollTop: 'Desplazarse hacia arriba',
                    moveTop: 'Mover arriba',
                    moveUp: 'Subir',
                    moveDown: 'Bajar',
                    moveBottom: 'Desplazarse hacia abajo',
                    moveToTarget: 'Mover al objetivo',
                    moveToSource: 'Mover al origen',
                    moveAllToTarget: 'Mover todo al objetivo',
                    moveAllToSource: 'Mover todo al origen',
                    pageLabel: 'Página {page}',
                    firstPageLabel: 'Primera Página',
                    lastPageLabel: 'Última Página',
                    nextPageLabel: 'Siguiente Página',
                    previousPageLabel: 'Página Anterior',
                    rowsPerPageLabel: 'Filas por página',
                    jumpToPageDropdownLabel: 'Ir al menú desplegable de página',
                    jumpToPageInputLabel: 'Ir a la entrada de página',
                    selectRow: 'Seleccionar fila',
                    unselectRow: 'Desmarcar fila',
                    expandRow: 'Expandir Fila',
                    collapseRow: 'Reducir Fila',
                    showFilterMenu: 'Mostrar menú del filtro',
                    hideFilterMenu: 'Ocultar menú del filtro',
                    filterOperator: 'Operador de filtro',
                    filterConstraint: 'Restricción de filtro',
                    editRow: 'Editar fila',
                    saveEdit: 'Guardar editado',
                    cancelEdit: 'Cancelar editado',
                    listView: 'Vista de lista',
                    gridView: 'Vista de cuadrícula',
                    slide: 'Deslizar',
                    slideNumber: '{slideNumber}',
                    zoomImage: 'Ampliar imagen',
                    zoomIn: 'Ampliar',
                    zoomOut: 'Reducir',
                    rotateRight: 'Girar a la derecha',
                    rotateLeft: 'Girar a la izquierda'
                }
            }
        },
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
});
