<script setup>
//import HelloWorld from './components/HelloWorld.vue'
import MyName from "./components/MyName.vue";
</script>

<template>
  <select
    name="status"
    @change="onSelectChange"
  >
    v-if ="!status"
    <option
      value="unselected"
      selected
    >
      Unselected
    </option>
    <option
      v-for="item in ['Ready', 'Start', 'Stop']"
      :key="item"
      :value="item"
      :selected="item === status"
    >
      {{ item }}
    </option>
  </select>

  <MyName
    :status=" status"
    @reset="onStatusReset"
  />
</template>
<script>
export default {
  data: () => ({
    status: null,
}),
methods:{
  onSelectChange (event) {
    console.log("App -> onSelectChange:", event.target.value);
    this.status = event.target.value;
  },
    onStatusReset(){
      console.log("App -> onStatusReset");
      this.status = null;
    }
  }

};
</script>
<style scoped>

</style>
