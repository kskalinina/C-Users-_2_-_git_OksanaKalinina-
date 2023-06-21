import { IUser } from "@/interface";
import { defineStore } from "pinia";
import {useLazyQuery} from "@vue/apollo-composable";
import gql from "graphql-tag";

interface IUserState {
  user?: IUser
}
const { load, onResult, onError } = useLazyQuery(gql `query GetUserWithCredentials($username: String!, $password: String!) {
      user(where: {name: {_eq: $username}, password: {_eq: $password}}) {
        name
        password
        id
      }
    }`
);
export const useUserStore = defineStore("user", {
  state: (): IUserState =>  ({ user: undefined }),
  getters: {
    hasUser: (state): boolean => !!state.user?.name,
    // getTodosCount: (state) => state.todos.length,
  },
  actions: {
    loginUser(username: string,password: string) {
      console.log("> loginUser -> setupUser:", {username, password});
    },
    setupUser(user:IUser) {
      console.log("> userStore -> setupUser:", {user});
      this.user =user;
    },
    // createTodo(todoText) {
    //     console.log('> useTodosStore -> createTodo: ', { todoText });
    //     this.todos.push(todoText);
    // },
  },
  persist: true
});



