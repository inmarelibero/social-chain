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
          primary: '#a76b80',
          secondary: '#00B8D4',
          accent: '#FFC107',
          background: '#F9FAFB',
          surface: '#FFFFFF',
          'text-primary': '#212121',
          'text-secondary': '#757575',
          success: '#4CAF50',
          error: '#F44336',
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
