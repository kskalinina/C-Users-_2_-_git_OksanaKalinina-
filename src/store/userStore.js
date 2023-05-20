import { defineStore } from "pinia";

export const useUserStore = defineStore("user",  {
  state: () => ({ user: {name: "Oksana"}, }),
  getters: {

    hasUser: (state) => !!state.user.name,

  },
  actions: {
// createTodo(todoText) {
//   console.log("useTodoStore->action: createTodo",{todoText});
//   this.todos.push(todoText);
//   },


    },
persist: true
});


