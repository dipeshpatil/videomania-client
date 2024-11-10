<template>
  <div
    v-if="!loading"
    class="max-w-lg mx-auto bg-white shadow-xl rounded-lg overflow-hidden mt-10 border border-gray-200 transform hover:scale-105 transition-all duration-300 ease-in-out"
  >
    <div
      class="bg-gradient-to-r from-blue-500 to-blue-700 p-6 text-white text-center rounded-t-lg shadow-lg"
    >
      <h2 class="text-3xl font-bold tracking-wide">{{ user?.name }}</h2>
      <p class="text-sm mt-2">{{ user?.email }}</p>
    </div>

    <div class="p-8 space-y-6">
      <div
        class="flex justify-between items-center hover:bg-gray-50 p-4 rounded-lg transition-all duration-200 ease-in-out"
      >
        <div class="text-gray-700">
          <p class="font-medium text-lg">Role</p>
          <p
            :class="[
              'text-sm rounded-full px-3 py-1',
              user?.role === 'USER'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-red-100 text-red-800',
            ]"
          >
            {{ user?.role }}
          </p>
        </div>
        <div class="text-gray-700">
          <p class="font-medium text-lg">Plan</p>
          <p class="text-sm bg-blue-100 text-blue-800 rounded-full px-3 py-1">
            {{ user?.plan }}
          </p>
        </div>
      </div>

      <div class="border-t border-gray-200 pt-6">
        <p class="font-medium text-gray-700 mb-4">Permissions</p>
        <div class="flex flex-wrap gap-3">
          <span
            v-for="permission in user?.permissions"
            :key="permission"
            class="bg-green-100 text-green-800 text-sm rounded-full px-4 py-2 transform hover:scale-110 transition-all duration-300 ease-in-out"
          >
            {{ permission }}
          </span>
        </div>
      </div>

      <div class="text-center py-6 border-t border-gray-200">
        <p class="text-4xl font-bold text-gray-800">{{ user?.credits }}</p>
        <p class="text-gray-500 text-sm mt-2">Credits Remaining</p>
      </div>

      <div
        class="text-center text-gray-500 text-sm border-t border-gray-200 pt-6"
      >
        <p>Account Created:</p>
        <p class="font-semibold">{{ formattedDate }}</p>
      </div>
    </div>
  </div>
  <Loader :loading="loading" :fullscreen="true" />
</template>

<script>
import { getUserDetails } from "../utils/auth";
import Loader from "./Loader.vue";

export default {
  components: {
    Loader,
  },
  data() {
    return {
      user: this.$store.getters.getUser || undefined, // Local state to store user details
      loading: true,
    };
  },
  computed: {
    // Format the user date from the local data
    formattedDate() {
      const date = new Date(this.user?.date);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
  watch: {
    // Watch Vuex store for changes and update local state accordingly
    "$store.state.userDetails": {
      immediate: true, // Run on component mount
      handler(newValue) {
        this.user = newValue;
        this.loading = false;
      },
    },
  },
  mounted() {
    if (!this.user) {
      this.fetchUserDetails();
    }
  },
  methods: {
    async fetchUserDetails() {
      try {
        const userDetailsResult = await getUserDetails();
        const { user } = userDetailsResult;
        if (user) {
          this.$store.dispatch("saveUser", user);
          this.user = user;
          this.loading = false;
        } else {
          this.user = null;
          this.loading = true;
        }
      } catch (error) {
        this.user = null;
        this.loading = true;
      }
    },
  },
};
</script>

<style scoped>
.user-card {
  background-color: #ffffff; /* White background */
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  margin: auto;
}

.user-card h2 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.user-card p {
  font-size: 1rem;
  color: #666;
  margin: 5px 0;
}

.user-card .user-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 20px;
}

.user-card .user-details p {
  font-size: 1rem;
  color: #444;
}

.user-card .plan {
  font-size: 1rem;
  font-weight: bold;
  color: #28a745; /* Green color for PRO plan */
  margin-top: 15px;
}

.user-card .credits {
  font-size: 1rem;
  color: #007bff; /* Blue color for credits */
  margin-top: 10px;
}
</style>
