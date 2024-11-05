<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <form
      @submit.prevent="handleSubmit"
      class="w-full max-w-md p-6 bg-white rounded shadow-md"
    >
      <h2 class="text-2xl font-bold text-center mb-6">Register</h2>

      <!-- Name Input -->
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold mb-1" for="name"
          >Name</label
        >
        <input
          type="text"
          id="name"
          v-model="form.name"
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <span v-if="errors.name" class="text-red-500 text-sm">{{
          errors.name
        }}</span>
      </div>

      <!-- Email Input -->
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold mb-1" for="email"
          >Email</label
        >
        <input
          type="email"
          id="email"
          v-model="form.email"
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <span v-if="errors.email" class="text-red-500 text-sm">{{
          errors.email
        }}</span>
      </div>

      <!-- Password Input -->
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold mb-1" for="password"
          >Password</label
        >
        <input
          type="password"
          id="password"
          v-model="form.password"
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <span v-if="errors.password" class="text-red-500 text-sm">{{
          errors.password
        }}</span>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Register
      </button>
      <p
        @click="goToLogin"
        class="mt-4 text-center text-gray-600 cursor-pointer"
      >
        Already have an account? Click <span class="text-blue-500">Login!</span>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem("token");
    },
  },
  watch: {
    isAuthenticated(value) {
      // If not authenticated, redirect to home
      if (value) {
        this.$router.push("/");
      }
    },
  },
  mounted() {
    // Redirect if not authenticated
    if (this.isAuthenticated) {
      this.$router.push("/");
    }
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
      },
      errors: {
        name: null,
        email: null,
        password: null,
      },
    };
  },
  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
    handleSubmit() {
      // Clear previous errors
      this.errors = { name: null, email: null, password: null };

      // Validate form fields
      if (!this.form.name) this.errors.name = "Name is required.";
      if (!this.form.email) this.errors.email = "Email is required.";
      if (!this.form.password) this.errors.password = "Password is required.";

      // Check if there are any errors
      if (!this.errors.name && !this.errors.email && !this.errors.password) {
        alert("Form submitted successfully!");
        const { name, email, password } = this.form;
        console.log({ name, email, password });
        // Handle successful submission here (e.g., API call)
      }
    },
  },
};
</script>

<style scoped>
/* You can add custom styles here */
</style>
