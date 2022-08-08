import { createApp } from 'vue';
import store from './store/index.js';
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseModal from './components/ui/BaseModal';
import App from './App.vue';

const app = createApp(App);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-modal', BaseModal);

app.use(store);

app.mount('#app');
