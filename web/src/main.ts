import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue';
import router from '@/router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import './styles/main.scss'

import 'vue-loading-overlay/dist/css/index.css';

const app = createApp(App)
const pinia = createPinia()

app
    .use(VueQueryPlugin, {})
    .use(pinia)

/**
 * router
 */
app.use(router);

/**
 * Vuetify
 */
const myCustomLightTheme = {
    dark: false,
    colors: {
        // background: '#FFFFFF',
        // surface: '#FFFFFF',
        // 'surface-bright': '#FFFFFF',
        // 'surface-light': '#EEEEEE',
        // 'surface-variant': '#424242',
        // 'on-surface-variant': '#EEEEEE',
        primary: '#ee8436',
        // 'primary-darken-1': '#1F5592',
        // secondary: '#48A9A6',
        // 'secondary-darken-1': '#018786',
        // error: '#B00020',
        // info: '#2196F3',
        // success: '#4CAF50',
        // warning: '#FB8C00',
    },
    variables: {
        // 'border-color': '#000000',
        // 'border-opacity': 0.12,
        // 'high-emphasis-opacity': 0.87,
        // 'medium-emphasis-opacity': 0.60,
        // 'disabled-opacity': 0.38,
        // 'idle-opacity': 0.04,
        // 'hover-opacity': 0.04,
        // 'focus-opacity': 0.12,
        // 'selected-opacity': 0.08,
        // 'activated-opacity': 0.12,
        // 'pressed-opacity': 0.12,
        // 'dragged-opacity': 0.08,
        // 'theme-kbd': '#212529',
        // 'theme-on-kbd': '#FFFFFF',
        // 'theme-code': '#F5F5F5',
        // 'theme-on-code': '#000000',
    }
}

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
    display: {
        mobileBreakpoint: 'sm',
        thresholds: {
            xs: 0,
            sm: 340,
            md: 540,
            lg: 800,
            xl: 1280,
        },
    },
    theme: {
        defaultTheme: 'myCustomLightTheme',
        themes: {
            myCustomLightTheme,
        },
    },
})

app.use(vuetify)

/**
 * mount
 */
app.mount('#app')
