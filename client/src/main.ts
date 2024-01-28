import { createApp } from "vue";
import App from "./App.vue";
import "../assets/main.css";
import "vue-final-modal/style.css";
import { createVfm } from "vue-final-modal";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const app = createApp(App);
const vfm = createVfm();
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(vfm).use(pinia).mount("#app");
