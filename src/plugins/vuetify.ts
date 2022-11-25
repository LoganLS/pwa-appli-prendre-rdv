import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

const LightTheme: any = {
    dark: false,
    variables: {},
    colors: {
        primary: '#E75A7C',
        secondary: '#F2F5EA',
        info: '#72B6E9',
        success: '#8FDC8D',
        accent: '#FC4B6C',
        warning: '#EC671C',
        error: '#E26161',

        // Custom colors
        third: '#2C363F',
    },
}

export default createVuetify({
    components,
    directives,
    theme: {
        themes: {
            light: LightTheme,
        },
    },
    defaults: {
        VBtn: {
            color: 'primary',
            fontWeight: '500',
        },
        VIcon: {
            color: 'third',
        },
        VRow: {
            margin: 0,  
        },
        VSelect: {
            variant: 'outlined',
        },
        VTextField: {
            variant: 'outlined',
        },
    },
})
