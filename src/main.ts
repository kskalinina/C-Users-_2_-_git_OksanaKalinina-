import {createApp} from "vue";
import "./style.css";
import {createPinia} from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import AppComposition from "./App.vue";
import router from "./router";
import {DefaultApolloClient} from "@vue/apollo-composable";
import apolloClient from "@/apollo";

createApp(AppComposition)
  .use(createPinia().use(piniaPluginPersistedState))
  .provide(DefaultApolloClient, apolloClient)
  .use(router)
  .mount("#app");
