import { IUser } from "@/interface";
import { defineStore } from "pinia";

interface IUserState {
  user?: IUser
}
export const useUserStore = defineStore("user",  {
  state: (): IUserState => ({  }),
  getters: {

    hasUser: (state): boolean => !!state.user?.name,

  },
  actions: {
// createTodo(todoText) {
//   console.log("useTodoStore->action: createTodo",{todoText});
//   this.todos.push(todoText);
//   },


    },
persist: true
});


