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

let db = new PouchDB(`${import.meta.env.VITE_SERVER_DB_PATH}/books`);
db.get("book1").then((doc)=> {
  console.log("doc",doc);
});
db.changes({
  since: "now",
  live: true,
  include_docs: true
}).on("change", function(change) {
  // handle change
  console.log("change", change);
}).on("complete", function(info) {
  // changes() was canceled
  console.log("complete", info);
}).on("error", function (err) {
  console.log(err);
});


createApp(AppComposition)
  .use(createPinia().use(piniaPluginPersistedState))
  .provide(PROVIDE.PB,pb)
  .use(router)
  .mount("#app");
