import {createApp} from "vue";
import "./style.css";
import {createPinia} from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import PocketBase from "pocketbase";
import AppComposition from "./App.vue";
import router from "./router.js";
import PROVIDE  from "@/constans/PROVICE_PB.js";

const pb = new PocketBase(import.meta.env.VITE_SERVER_PATH);
console.log("pb.authStore.isValid:", pb.authStore.isValid);

createApp(AppComposition)
  .use(createPinia().use(piniaPluginPersistedState))
  .provide(PROVIDE.PB,pb)
  .use(router)
  .mount("#app");
