<script setup>
import Login from "./components/auth/Login.vue";
import Register from "./components/auth/Register.vue";
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full bg-white rounded shadow-md">
      <!-- Toggle Text Link -->
      <p class="my-4 text-center text-gray-600">
        {{ showLogin ? "Need an account?" : "Already have an account?" }}
        <span
          @click="toggleForm"
          class="text-blue-500 cursor-pointer hover:underline"
        >
          {{ showLogin ? "Click Register!" : "Click Login!" }}
        </span>
      </p>
      <!-- Conditional Rendering of Components -->
      <Login v-if="showLogin" />
      <Register v-else />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Login,
    Register,
  },
  data() {
    return {
      showLogin: true, // Tracks which component to show
    };
  },
  methods: {
    toggleForm() {
      this.showLogin = !this.showLogin;
    },
  },
};
</script>

<style scoped></style>
