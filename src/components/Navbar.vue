<template>
  <nav class="flex justify-center space-x-4 p-4 bg-gray-200">
    <router-link
      v-if="isAuthenticated"
      to="/"
      class="text-blue-500 hover:underline"
      >Home</router-link
    >
    <router-link
      v-if="!isAuthenticated"
      to="/login"
      class="text-blue-500 hover:underline"
      >Login</router-link
    >
    <router-link
      v-if="!isAuthenticated"
      to="/register"
      class="text-blue-500 hover:underline"
      >Register</router-link
    >
    <router-link
      @click="logoutUser"
      v-if="isAuthenticated"
      to="/login"
      class="text-blue-500 hover:underline"
      >Logout</router-link
    >
  </nav>
  <router-view />
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      // Check for token in local storage
      return !!localStorage.getItem("token");
    },
  },
  mounted() {},
  methods: {
    logoutUser() {
      localStorage.removeItem("token");
    },
  },
};
</script>

<style scoped>
/* You can add custom styles here */
</style>
