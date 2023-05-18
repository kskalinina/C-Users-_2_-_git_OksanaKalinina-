<script setup>
import { computed, onMounted, ref, watch } from "vue";
import TodoItem from "./components/TodoItem.vue";
import AppHeader from "./components/AppHeader.vue";
const LOCAL_KEY_TODOS = "todos";
const LOCAL_KEY_INPUT_TEXT = "input_text";


const parseLocalStorageWithDefaultValue = (key,alt) => JSON.parse(localStorage.getItem(key) || JSON.stringify(alt));

const user = ref({name:"Oksana"});
const  inputText = ref(parseLocalStorageWithDefaultValue(LOCAL_KEY_INPUT_TEXT,"" ));
const  todos = ref(parseLocalStorageWithDefaultValue(LOCAL_KEY_TODOS, "[]"));
const canAddItemToTheList =computed( () => true);
const getTodoCount =computed( () => todos.value?.length);
const getTodoText =computed( () => inputText.value?.trim());


const  onInputEnterKeyUp = ()  => {
    console.log("App->onInputEnterKeyUp:",getTodoText.value);
   todos.value.push(getTodoText.value);
  inputText.value = " ";
  };

const onDeleteTodo = (index) => {
  console.log("->App-onDeleteTodo: index",index);
  todos.value.splice(index, 1);
};

const saveLocalStorage = (key,value) => {
  console.log(">saveLocalStorage=", value);
  localStorage.setItem(key, JSON.stringify(value));
};
watch(inputText, (v) => saveLocalStorage(LOCAL_KEY_INPUT_TEXT,v));
watch(todos, (v) => saveLocalStorage(LOCAL_KEY_TODOS, v),{deep:true});

onMounted( () => {
  console.log(">-App ->onMounted");
});
</script>

<template>
  <AppHeader>
    <font color="red">
      Todo App
    </font>
    <template #sub-header>
      <span v-if="user">created by {{ user.name }}</span>
      <span v-else> noname</span>
    </template>
  </AppHeader>
  <input
    ref="domInput"
    v-model="inputText"
    @keyup.enter="canAddItemToTheList && onInputEnterKeyUp()"
  >

  <div>
    List: <span v-if="todos.length">{{ getTodoCount }}</span>
    <span v-else>empty </span>
    <TodoItem
      v-for="(item,index) in todos"
      :key="item"
      :index="index +1"
      :text="item"
      @delete="onDeleteTodo(index)"
    />
  </div>
</template>


