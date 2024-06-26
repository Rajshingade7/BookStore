import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from './App.vue'
import router from './router'
import { mdi } from 'vuetify/lib/iconsets/mdi.mjs'
import { createVuetify } from 'vuetify'
const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      sets: {
        mdi,
      },
    },
  })
  
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify);
app.mount('#app')