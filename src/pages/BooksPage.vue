<script setup lang="ts">
import {inject, onMounted, ref} from "vue";
import PROVIDE from "@/constans/PROVICE_PB.js";
import { useRouter} from "vue-router";
import {DefaultApolloClient, useLazyQuery} from "@vue/apollo-composable";
import gql from "graphql-tag";

const router = useRouter();

const domInputFile= ref(null);
const domBtnUpload= ref(null);

const isUploading = ref (false);
const isReady = ref (false);
//const isBooksLoading = ref (false);

const apollo = inject(DefaultApolloClient);
console.log((apollo as any).link);

const BOOKS_ITEMS_PER_PAGE = 10;
const books = ref([]);
const routerQueryPage: string = router.currentRoute.value.query.page?.toString() || " ";
const pageIndex = ref(parseInt(routerQueryPage) || 1);
const pagesMax = ref(0);
const { load, onResult, loading: isBooksLoading } = useLazyQuery(gql `query MyQuery($limit: Int!, $offset: Int!) {
  books(limit: $limit, offset: $offset) {
    id
    country
    imageLink
    language
    pages
    title
    year
  }
  books_aggregate {
    aggregate {
      count
    }
  }
}`
);
onResult((result) => {
  console.log(result);
  if (!result.loading) {
    const {data} = result;
    books.value =data.books.map((i:any) => i);
    pagesMax.value = data.books_aggregate.aggregate.count;
  }
});
const loadBooks = async () => {
  isBooksLoading.value = true;
  load(null, {
    limit: BOOKS_ITEMS_PER_PAGE,
    offset: (pageIndex.value - 1)
        * BOOKS_ITEMS_PER_PAGE
  }, {context: {
    headers: {
      "X-Hasura-Role": "user"
    }
    }});
};
const onChangePage =(delta: number) => {
  console.log(">BooksPage -> onChangePage", {delta});
  pageIndex.value += delta;
  loadBooks().then(() => {
    router.replace({
      query: {page: pageIndex.value} });
  });
};
onMounted(() => {
  Promise.all([
    loadBooks()
  ]).then(()=>{
    isReady.value=true;
  });
});
</script>
<template>
  <div v-if="!isReady">
    Books page Loading
  </div>
  <div v-else>
    <div v-if="books.length > 0">
      <v-btn-group
          border="10"
          density="compact"
      >
        <v-btn
            :disabled="pageIndex === 1 || isBooksLoading"
            @click="onChangePage(-1)"
        >
          Prev
        </v-btn>
        <v-btn
            :disabled="pageIndex === pagesMax || isBooksLoading"
            @click="onChangePage(1)"
        >
          Next
        </v-btn>
      </v-btn-group>
      <div>
        <b> Books ({{ pageIndex }}/{{ pagesMax }}):</b>
        <div v-if="isBooksLoading">Books Loading </div>
        <v-list v-else
                class="text-left"
        >
          <v-list-item
              v-for="book in books"
              :key="book.id"
              :title="book.title"
              base-color="blue"
              rounded="xl"
              class="ma-10"
              :to="`/books/${book.id}`"
          >
           </v-list-item>
        </v-list>
      </div>
    </div>
<!--    <div v-else>-->
<!--      <input-->
<!--        ref="domInputFile"-->
<!--        hidden-->
<!--        type="file"-->
<!--        accept=".json"-->
<!--      >-->
<!--      <button-->
<!--        ref="domBtnUpload"-->
<!--        @click="onUploadClick"-->
<!--      >-->
<!--        Upload-->
<!--      </button>-->
<!--      <div v-if="isUploading">-->
<!--        In progess, wait please ...-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<style scoped>

</style>