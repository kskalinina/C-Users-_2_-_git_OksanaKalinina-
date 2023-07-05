import { defineStore } from "pinia";
import {provideApolloClient, useLazyQuery, useMutation, useQuery} from "@vue/apollo-composable";
import gql from "graphql-tag";
import apolloClient from "@/apollo";

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

const queryBookDetailsWithCommentsById = provideApolloClient(apolloClient)(() => useLazyQuery(gql `
  query GetBook($id: Int!){
    books_by_pk(id: $id) {
      country
      language
      pages
      title
      year
      imageLink
      comments {
        comment
        id
        user {
          name
        }
      }
    }
  }
`));


export const useBookStore = defineStore("books", {
  state: (): any => ({selectedBook: undefined, isSelectedBookLoading: true}),
  actions: {
    async loadBookDetailsWithCommentsById(id: string) {
      return new Promise((resolve) => {
        queryBookDetailsWithCommentsById.onResult((result) => {
          if(!result.loading) {
            this.selectedBook = result.data.books_by_pk;
            this.isSelectedBookLoading = false;
            resolve(result.data.books_by_pk);
                      }
        });
        queryBookDetailsWithCommentsById.load(null,{id});
      });
    },
    async insertCommentToBookFromUser(books_id: number, user_id: string, comment:string) {
      console.log(">userStore ->insertCommentToBook: ", {books_id, comment});
      return insertCommentToBook({books_id, user_id, comment});
    }
  },
  persist: false
});



