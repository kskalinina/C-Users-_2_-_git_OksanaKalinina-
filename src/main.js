// eslint-disable-next-line
import { createApp } from 'vue';
// eslint-disable-next-line quotes
import './style.css';
import { createRouter, createWebHashHistory} from "vue-router";
// eslint-disable-next-line
import AppComposition from './AppComposition.vue';
import TodosPage from "./components/TodosPage.vue";
import IndexPage from "./components/IndexPage.vue";
import router from "./router.js";
import { createPinia } from "pinia";



// eslint-disable-next-line

createApp(AppComposition)
  .use(createPinia())
  .use(router)
  .mount("#app");
