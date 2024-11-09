<template>
  <nav class="flex justify-between items-center p-4 bg-gray-200">
    <!-- Logo Section - Left side -->
    <div class="flex items-center space-x-2">
      <span class="font-bold text-xl text-pink-600">VideoMania</span>
      <!-- This is your placeholder logo -->
    </div>

    <!-- Left side - Home, Videos -->
    <div class="flex ml-4 space-x-4">
      <router-link
        v-if="isAuthenticated"
        to="/"
        class="text-blue-500 hover:underline"
        >Home</router-link
      >
      <router-link
        v-if="isAuthenticated"
        to="/videos"
        class="text-blue-500 hover:underline"
        >Videos</router-link
      >
      <router-link
        v-if="isAuthenticated"
        to="/links"
        class="text-blue-500 hover:underline"
        >Links</router-link
      >
    </div>

    <!-- Right side - Profile, Logout, Login, Register -->
    <div class="flex space-x-4 ml-auto">
      <router-link
        v-if="isAuthenticated"
        to="/profile"
        class="text-blue-500 hover:underline"
        >Profile</router-link
      >
      <router-link
        v-if="isAuthenticated"
        @click="logoutUser"
        to="/login"
        class="text-red-500 hover:underline"
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
        class="text-green-600 hover:underline"
        >Register</router-link
      >
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: this.$store.getters.getToken, // Initial check
    };
  },
  methods: {
    logoutUser() {
      this.$store.dispatch("logout");
      this.isAuthenticated = false; // Update authentication status
      this.$router.push("/login"); // Redirect to login page
    },
  },
  watch: {
    // Watch route changes to update isAuthenticated state in case of token change
    $route(to, from) {
      this.isAuthenticated = !!this.$store.getters.getToken;
    },
  },
};
</script>

<style scoped>
/* You can add custom styles here */
</style>
