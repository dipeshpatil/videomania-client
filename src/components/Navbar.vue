<template>
  <nav class="flex justify-center space-x-4 p-4 bg-gray-200">
    <router-link to="/" class="text-blue-500 hover:underline">Home</router-link>
    <router-link to="/login" class="text-blue-500 hover:underline"
      >Login</router-link
    >
    <router-link to="/register" class="text-blue-500 hover:underline"
      >Register</router-link
    >
    <router-link
      @click="logoutUser"
      to="/login"
      class="text-blue-500 hover:underline"
      >Logout</router-link
    >
  </nav>
  <router-view />
</template>

<script>
export default {
  methods: {
    logoutUser() {
      localStorage.removeItem("token");
    },
  },
  data() {},
  watch: {},
  mounted() {},
};
</script>

<style scoped>
/* You can add custom styles here */
</style>
