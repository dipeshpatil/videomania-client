<template>
  <nav class="flex justify-center space-x-4 p-4 bg-gray-200">
    <router-link to="/login" class="text-blue-500 hover:underline"
      >Login</router-link
    >
    <router-link to="/register" class="text-blue-500 hover:underline"
      >Register</router-link
    >
  </nav>
  <router-view />
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
/* You can add custom styles here */
</style>
