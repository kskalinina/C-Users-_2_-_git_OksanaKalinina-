<script setup lang="ts">
import { computed, ref, watch } from "vue";
import TodoItem from "@/components/TodoItem.vue";
import { parseLocalStorageWithDefaultValue, saveLocalStorage } from "@/utils/storyutils.js";
import {  useTodosStore } from "@/store/todosStore.js";
import { storeToRefs } from "pinia";


const LOCAL_KEY_INPUT_TEXT = "input_text";


const  inputText = ref(parseLocalStorageWithDefaultValue(LOCAL_KEY_INPUT_TEXT,"" ));
const  todoStore = useTodosStore();
const { todos, getTodoCount } = storeToRefs(todoStore);

const canAddItemToTheList =computed( () => true);

const getTodoText =computed( () => inputText.value?.trim());


const  onInputEnterKeyUp = ()  => {
  console.log("TodosPage->onInputEnterKeyUp:",getTodoText.value);
  todoStore.createTodo(getTodoText.value);
  inputText.value = " ";
};

const onDeleteTodo = (index) => {
  console.log("->TodosPage-onDeleteTodo: index",index);
  todoStore.deleteTodoByIndex(index);
};

watch(inputText, (v) => saveLocalStorage(LOCAL_KEY_INPUT_TEXT,v));

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