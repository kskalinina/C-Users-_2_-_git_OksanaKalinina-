// eslint-disable-next-line
import { createApp } from 'vue';
// eslint-disable-next-line quotes
import './style.css';
import { createRouter, createWebHashHistory} from "vue-router";
// eslint-disable-next-line
import AppComposition from './AppComposition.vue';
import TodosPage from "./components/TodosPage.vue";
import IndexPage from "./IndexPage.vue";

const router = createRouter({
    history: createWebHashHistory(),
  routes: [
    {
      path:"/",
      component: IndexPage
    },
    {
      path:"/todos",
      component: TodosPage
    }
    ],
});

// eslint-disable-next-line

createApp(AppComposition)
  .use(router)
  .mount("#app");
