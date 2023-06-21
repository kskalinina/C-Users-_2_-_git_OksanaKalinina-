<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import AppHeader from "./components/AppHeader.vue";
import ROUTES from "@/constans/routes.js";
import {useRoute} from "vue-router";
import AppMenu from "@/components/AppMenu.vue";
import {useQuery} from "@vue/apollo-composable";
import gql from "graphql-tag";
import {useUserStore} from "@/store/userStore";
import {storeToRefs} from "pinia";

const userStore = useUserStore();
const { user, hasUser } = storeToRefs(userStore);
const { result:usersData, loading:isUserLoading , error:errorUserLoading} = useQuery(gql`
  query getUsers {
    user {
      id
      name
    }
  }
`);

const checkRouteIsNotCurrent = (routePath:string) => useRoute().path !== routePath;

const menuLinks = reactive([
  { name: "Index", link: ROUTES.INDEX, canRender: computed( () => checkRouteIsNotCurrent(ROUTES.INDEX)) },
  //{ name: "Todos", link: ROUTES.TODOS, canRender: computed( () => hasUser.value && checkRouteIsNotCurrent(ROUTES.TODOS)) },
  { name: "Books", link: ROUTES.BOOKS, canRender: computed( () => hasUser.value && checkRouteIsNotCurrent(ROUTES.BOOKS)) },
  { name: "Sign In", link: ROUTES.SIGNIN, canRender: computed( () => !hasUser.value && checkRouteIsNotCurrent(ROUTES.SIGNIN)) },
  { name: "Sign Out", link: ROUTES.INDEX, canRender: computed(() => hasUser.value), onClick() {
    console.log("SignOUT");

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
    <div v-else-if="usersData">
      {{ usersData.user}}
    </div>
    <div v-else-if="errorUserLoading">
      Error loading user: {{errorUserLoading}}
    </div>
    <template #sub-header>
      <span v-if="hasUser">created by {{ user.name }}</span>
      <span v-else> noname</span>
    </template>
  </AppHeader>
  <AppMenu
    style="margin: 2rem 0;"
    :links="menuLinks"
  />
      <router-view />

</template>


