<template>
  <nav class="flex justify-center space-x-4 p-4 bg-gray-200">
    <router-link
      v-if="isAuthenticated"
      to="/"
      class="text-blue-500 hover:underline"
      >Home</router-link
    >
    <router-link
      v-if="isAuthenticated"
      @click="logoutUser"
      to="/login"
      class="text-blue-500 hover:underline"
      >Logout</router-link
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
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: !!localStorage.getItem("token"), // Initial check
    };
  },
  methods: {
    logoutUser() {
      localStorage.removeItem("token");
      this.isAuthenticated = false; // Update authentication status
      this.$router.push("/login"); // Redirect to login page
    },
  },
  watch: {
    // Watch route changes to update isAuthenticated state in case of token change
    $route(to, from) {
      this.isAuthenticated = !!localStorage.getItem("token");
    },
  },
};
</script>

<style scoped>
/* You can add custom styles here */
</style>
