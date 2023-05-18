import { ref } from "vue";
import { parseLocalStorageWithDefaultValue } from "../utils/storyutils.js";

const LOCAL_KEY_TODOS = "todos";
const  todos = ref(parseLocalStorageWithDefaultValue(LOCAL_KEY_TODOS, "[]"));

export {todos};
