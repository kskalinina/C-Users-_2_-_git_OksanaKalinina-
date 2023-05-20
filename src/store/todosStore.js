import { defineStore } from "pinia";

export const useTodosStore = defineStore("todos",  {
  state: () => ({ todos: [], }),
  getters: {
    getTodoCount: (state) => state.todos.length,
    getTodoByIndex: (state) => {
  return (index) => state.todos[index];
}
  },
  actions: {
createTodo(todoText) {
  console.log("useTodoStore->action: createTodo",{todoText});
  this.todos.push(todoText);
},
    deleteTodoByIndex(index) {
      console.log("useTodoStore->action: deleteTodoByIndex",{index});
      this.todos.splice(index, 1);
    },
    editTodoTextByIndex(index, text) {
      console.log("useTodoStore->action: editTodoTextByIndex",{index, text});
      this.todos[index] = text;
},
    },
persist: true
});


