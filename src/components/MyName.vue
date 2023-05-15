<template>
  <h1>Enter you name</h1>
  <div>
    {{ firstname }}
    <span style="color:red;">
      {{ lastname }}
    </span>
    <div>
      <small><span
               class="flex flex-col"
               :class="{
                 'selected': !!status,
                 'unselected': !status
               }"
             >
               Status:
             </span>

        <span> {{ status }}</span>
        <div>
          <button
            :style="{
              visibility: status
                ? 'visible': 'hidden',
            }"
            @click="onResetClick"
          >Reset</button>
        </div>
      </small>
    </div>
  </div>
</template>;

<script>
export default {
  name: "MyName",
  props: {
    status: {
      type: String,
      default: "-"
    },
  },
emits: { "reset": null },
  data: () => ({
    firstname: "Oksana",
    lastname: "Kalinina"
  }),
    methods: {
      onResetClick() {
        console.log("> My Name -> onResetClick");
        this.$emit ("reset");
      }
    }
    
  

};
</script>
<style scoped>
.selected {
  color: green;
}
.unselected {
  color: red;
}
</style>