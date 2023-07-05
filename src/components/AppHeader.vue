<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useBookStore} from "@/store/booksStore";

const {selectedBook}= storeToRefs(useBookStore());
</script>

<template>
  <h3>
    <slot>Header</slot>
    <div v-if="selectedBook"> {{selectedBook.title}}</div>
  </h3>
  <div>
    <small>
      <slot name="sub-header" />
    </small>
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";

export default  defineComponent({
  name: "AppHeader"
});
</script>
