<template>
  <div>
    <router-view v-if="isAuthenticated" />
    <div v-else>Loading...</div>
  </div>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      // Check for token in local storage
      return !!localStorage.getItem("token");
    },
  },
  watch: {
    isAuthenticated(value) {
      // If not authenticated, redirect to login
      if (!value) {
        this.$router.push("/login");
      }
    },
  },
  mounted() {
    // Redirect if not authenticated
    if (!this.isAuthenticated) {
      this.$router.push("/login");
    }
  },
};
</script>

<style>
/* Add styles if needed */
</style>
