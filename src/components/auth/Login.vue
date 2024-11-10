<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <form
      @submit.prevent="handleSubmit"
      class="w-full max-w-md p-6 bg-white rounded shadow-md"
    >
      <h2 class="text-2xl font-bold text-center mb-6">Login</h2>

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
        Login
      </button>
      <p v-if="errors.apiError" class="text-red-500 mt-4 text-center">
        {{ errors.apiError }}
      </p>
      <p
        @click="goToRegister"
        class="mt-4 text-center text-gray-600 cursor-pointer"
      >
        Need an account? Click <span class="text-green-500">Register!</span>
      </p>
    </form>
  </div>
</template>

<script>
import {
  loginUserAndAuthenticateToken,
  getUserDetails,
} from "../../utils/auth";

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
        email: "",
        password: "",
      },
      errors: {
        email: null,
        password: null,
        apiError: null,
      },
    };
  },
  methods: {
    goToRegister() {
      this.$router.push("/register");
    },
    redirectHome() {
      this.$router.push("/");
    },
    async handleSubmit() {
      this.errors = { email: null, password: null, apiError: null };

      if (!this.form.email) this.errors.email = "Email is required.";
      if (!this.form.password) this.errors.password = "Password is required.";

      if (!this.errors.email && !this.errors.password) {
        const { email, password } = this.form;
        const result = await loginUserAndAuthenticateToken(email, password);
        if (result) {
          const { token, errors } = result;
          if (token) {
            this.$store.dispatch("saveToken", token);

            const userDetailsResult = await getUserDetails(token);
            const { user, errors: userDetailsErrors } = userDetailsResult;

            if (user) {
              console.log(user);

              this.$store.dispatch("saveUser", user);
              this.redirectHome();
            } else {
              console.log(userDetailsErrors);
            }
          } else {
            this.errors.apiError = errors?.msg;
            console.log(errors?.msg);
          }
        } else {
          this.errors.apiError =
            "Failed to log in: function returned undefined";
        }
      }
    },
  },
};
</script>

<style scoped>
/* You can add custom styles here */
</style>
