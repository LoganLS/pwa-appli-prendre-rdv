import { createApp } from 'vue'
import { VueFire, VueFireAuth } from 'vuefire'

import App from '@/App.vue'
import router from '@/router'

import '@/assets/css/main.css'
import vuetify from '@/plugins/vuetify'
import { firebaseApp } from '@/plugins/firebase'

const app = createApp(App)

app.use(router)
app.use(vuetify)
app
  .use(VueFire, {
    firebaseApp,
    modules: [
      VueFireAuth(),
    ],
  })
app.mount('#app')