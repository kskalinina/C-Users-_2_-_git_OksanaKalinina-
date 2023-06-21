<script setup lang="ts">
import RegistrationForm from "@/components/RegistrationForm.vue";
import ROUTES from "@/constans/routes.js";
import {ref} from "vue";

const isSuccess = ref(false);
const onLogin = (dto) => {
  // pb.collection("users").authWithPassword(
  //   dto.username,
  //   dto.password,
  // ).then(() => {
  //   isSuccess.value = true;
  // });
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


