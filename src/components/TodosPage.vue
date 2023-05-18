<script setup>
import { computed, ref, watch } from "vue";
import TodoItem from "./TodoItem.vue";
import { parseLocalStorageWithDefaultValue, saveLocalStorage } from "../utils/storyutils.js";
import { todos } from "../store/todosStore.js";

const LOCAL_KEY_TODOS = "todos";
const LOCAL_KEY_INPUT_TEXT = "input_text";


const  inputText = ref(parseLocalStorageWithDefaultValue(LOCAL_KEY_INPUT_TEXT,"" ));


const canAddItemToTheList =computed( () => true);
const getTodoCount =computed( () => todos.value?.length);
const getTodoText =computed( () => inputText.value?.trim());


const  onInputEnterKeyUp = ()  => {
  console.log("TodosPage->onInputEnterKeyUp:",getTodoText.value);
  todos.value.push(getTodoText.value);
  inputText.value = " ";
};

const onDeleteTodo = (index) => {
  console.log("->TodosPage-onDeleteTodo: index",index);
  todos.value.splice(index, 1);
};

watch(inputText, (v) => saveLocalStorage(LOCAL_KEY_INPUT_TEXT,v));
watch(todos, (v) => saveLocalStorage(LOCAL_KEY_TODOS, v),{deep:true});

</script>
<template>
  <input
    ref="domInput"
    v-model="inputText"
    @keyup.enter="canAddItemToTheList && onInputEnterKeyUp()"
  >

  <div>
    List: <span v-if="todos.length">{{ getTodoCount }}</span>
    <span v-else>empty </span>
    <template
      v-for="(item,index) in todos"
      :key="item"
    >
      <TodoItem
        :index="index +1"
        :text="item"
        @delete="onDeleteTodo(index)"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: "TodosPage"
};
</script>

<style scoped>

</style>