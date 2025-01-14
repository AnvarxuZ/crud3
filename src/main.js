import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import store from "./store";

const app = createApp(App);

app.use(store);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.mount("#app");
