import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { OryPlugin } from './plugins/ory';
import { ApiPlugin } from './plugins/api';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(OryPlugin);
app.use(ApiPlugin);

app.mount('#app');
