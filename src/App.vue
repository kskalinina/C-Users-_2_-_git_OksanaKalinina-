<script setup>
import {computed, inject, reactive, ref} from "vue";
import AppHeader from "./components/AppHeader.vue";
import PROVIDE from "@/constans/PROVICE_PB.js";
import ROUTES from "@/constans/routes.js";
import {useRoute} from "vue-router";
import AppMenu from "@/components/AppMenu.vue";
import {useQuery} from "@vue/apollo-composable";
import gql from "graphql-tag";

const pb = inject(PROVIDE.PB);
const user = ref(pb.authStore.model);
pb.authStore.onChange(() => {
  console.log("App change",pb.authStore.onChange.model);
  user.value=pb.authStore.model;
});
const hasUser =computed(() => !!user.value);
const { result:usersData, loading:isUserLoading } = useQuery(gql`
  query getUsers {
    user {
      id
      name
    }
  }
`);

const checkRouteIsNotCurrent = (routePath) => useRoute().path !== routePath;

const menuLinks = reactive([
  { name: "Index", link: ROUTES.INDEX, canRender: computed( () => checkRouteIsNotCurrent(ROUTES.INDEX)) },
  //{ name: "Todos", link: ROUTES.TODOS, canRender: computed( () => hasUser.value && checkRouteIsNotCurrent(ROUTES.TODOS)) },
  { name: "Books", link: ROUTES.BOOKS, canRender: computed( () => hasUser.value && checkRouteIsNotCurrent(ROUTES.BOOKS)) },
  { name: "Sign In", link: ROUTES.SIGNIN, canRender: computed( () => !hasUser.value && checkRouteIsNotCurrent(ROUTES.SIGNIN)) },
  { name: "Sign Out", link: ROUTES.INDEX, canRender: computed(() => hasUser.value), onClick() {
    console.log("SignOUT");
    pb.authStore.clear();
  }
  },
]);


</script>
<template>
  <AppHeader>
    Todo App
    <div v-if="isUserLoading">
      Users Loading
    </div>
    <div v-else>
      {{ usersData}}
    </div>
    <template #sub-header>
      <span v-if="hasUser">created by {{ user.username }}</span>
      <span v-else> noname</span>
    </template>
  </AppHeader>
  <AppMenu
    style="margin: 2rem 0;"
    :links="menuLinks"
  />
      <router-view />
    
</template>


