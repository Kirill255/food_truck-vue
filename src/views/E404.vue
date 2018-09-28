<template>
  <div>
    <div>404</div>
    <div>Page not found</div>
    <router-link :to="{ name: 'home' }">Go Home</router-link>
  </div>
</template>

<script>
export default {
  name: "E404"
};
</script>

<style scoped>
</style>
