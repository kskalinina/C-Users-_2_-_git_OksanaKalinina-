<template>
  <div style="margin: 2rem 0;">
    <template
        v-for="menuItem in menuLinks"
        :key="menuItem.name"
    >
      <router-link
          v-if="menuItem.canRender"
          :to="menuItem.link"
      >
        {{ menuItem.name }}
      </router-link>
    </template>
  </div>
</template>
<script>
export default {
  name: 'AppMenu'
}
</script>