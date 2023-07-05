import { IUser } from "@/interface";
import { defineStore } from "pinia";
import {provideApolloClient, useMutation} from "@vue/apollo-composable";
import gql from "graphql-tag";
import apolloClient from "@/apollo";



interface IUserState {
  user?: IUser
}
const { mutate: insertCommentToBook } = provideApolloClient(apolloClient)(() => useMutation(gql`
  mutation InsertComments($user_id: uuid!, $books_id: Int, $comment: String) {
    insert_comments(objects: {user_id: $user_id, books_id: $books_id, comment: $comment}) {
      affected_rows
      returning {
        user_id
        books_id
        comment
        created_at
        updated_at
        id
      }
    }
  }
`));



export const useUserStore = defineStore("user", {
  state: (): IUserState =>  ({ user: undefined }),
  getters: {
    hasUser: (state): boolean => !!state.user?.name,
    userId: (state): string => state.user!.id,
    // getTodosCount: (state) => state.todos.length,
  },
  actions: {
    setupUser(user:IUser) {
      console.log("> userStore -> setupUser:", {user});
      this.user =user;
    },
    async insertCommentToBook(bookId: number, comment:string) {
      console.log(">userStore ->insertCommentToBook: ", {bookId, comment});
      return insertCommentToBook({books_id: bookId, user_id: this.userId, comment});
    }
  },
  persist: true
});



