<script setup lang="ts">
import RegistrationForm from "@/components/RegistrationForm.vue";
import ROUTES from "@/constans/routes.js";
import {ref} from "vue";
import {useLazyQuery} from "@vue/apollo-composable";
import gql from "graphql-tag";
import {useUserStore} from "@/store/userStore";

const isSuccess = ref(false);
const userStore = useUserStore ();

onResult((result) => {
  console.log("result", result);
  isSuccess.value = result.data.user?.length === 1;
  if (isSuccess.value) {
    userStore.setupUser(result.data.user[0]);
  }
  });
  onError((error) => {
    console.log(error);
  });
const onLogin = (dto: any) => {
load(null, dto);
};
</script>
<template>
  <div v-if="!isSuccess">
    <RegistrationForm @login="onLogin" />
    <router-link :to="ROUTES.SIGNUP">
      Sign Up
    </router-link>
  </div>
  <div v-else>
    <div> You have been successfull logged in</div>
    <router-link :to="ROUTES.INDEX">
      Home
    </router-link>
  </div>
</template>


