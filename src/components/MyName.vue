<template>
  <h1>Enter you name</h1>
  <div>
    {{ firstname }}
    <span style="color:red;">
      {{ lastname }}
    </span>
  </div>;
</template>

<script>
export default {
  name: "MyName",
  data: () => ({
    firstname: "Oksana",
    lastname: "Kalinina"
  })
};
</script>
<style scoped>
</style>