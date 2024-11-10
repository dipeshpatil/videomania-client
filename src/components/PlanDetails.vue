<template>
  <div class="max-w-4xl mx-auto mt-10">
    <h2 class="text-2xl font-bold text-center mb-6">Choose Your Plan</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Free Plan -->
      <div
        :class="[
          'border rounded-lg p-6 text-center text-blue-500',
          currentPlan === 'FREE'
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300',
        ]"
      >
        <h3 class="text-xl font-semibold mb-2">FREE</h3>
        <p class="text-gray-600 mb-4">50 Credits</p>
        <ul class="mb-4 space-y-2 text-left">
          <li class="flex items-center">
            <svg
              class="w-5 h-5 text-blue-500 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            <span>Upload</span>
          </li>
          <li class="flex items-center">
            <svg
              class="w-5 h-5 text-blue-500 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            <span>Share</span>
          </li>
          <li class="flex items-center line-through text-gray-400">
            <svg
              class="w-5 h-5 text-red-500 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Trim</span>
          </li>
          <li class="flex items-center line-through text-gray-400">
            <svg
              class="w-5 h-5 text-red-500 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Merge</span>
          </li>
        </ul>
        <button
          @click="selectPlan('FREE')"
          :disabled="true"
          class="w-full mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {{ currentPlan === "FREE" ? "Current Plan" : "Choose Free" }}
        </button>
      </div>

      <!-- Pro Plan -->
      <div
        :class="[
          'border rounded-lg p-6 text-center text-green-500',
          currentPlan === 'PRO'
            ? 'border-green-500 bg-green-50'
            : 'border-gray-300',
        ]"
      >
        <h3 class="text-xl font-semibold mb-2">PRO</h3>
        <p class="text-gray-600 mb-4">500 Credits</p>
        <ul class="mb-4 space-y-2 text-left">
          <li class="flex items-center">
            <svg
              class="w-5 h-5 text-green-500 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            <span>Upload</span>
          </li>
          <li class="flex items-center">
            <svg
              class="w-5 h-5 text-green-500 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            <span>Trim</span>
          </li>
          <li class="flex items-center">
            <svg
              class="w-5 h-5 text-green-500 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            <span>Share</span>
          </li>
          <li class="flex items-center line-through text-gray-400">
            <svg
              class="w-5 h-5 text-red-500 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Merge</span>
          </li>
        </ul>
        <button
          @click="selectPlan('PRO')"
          :disabled="['ULTRA', 'PRO'].includes(currentPlan)"
          class="w-full mt-4 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          {{ currentPlan === "PRO" ? "Current Plan" : "Choose Pro" }}
        </button>
      </div>

      <!-- Ultra Plan -->
      <div
        :class="[
          'border rounded-lg p-6 text-center',
          currentPlan === 'ULTRA'
            ? 'border-purple-500 bg-purple-50'
            : 'border-gray-300',
        ]"
      >
        <h3 class="text-xl font-semibold mb-2 text-purple-500">ULTRA</h3>
        <p class="text-gray-600 mb-4">1550 Credits</p>
        <ul class="mb-4 space-y-2 text-left">
          <li class="flex items-center">
            <svg
              class="w-5 h-5 text-purple-500 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            <span>Upload</span>
          </li>
          <li class="flex items-center">
            <svg
              class="w-5 h-5 text-purple-500 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            <span>Trim</span>
          </li>
          <li class="flex items-center">
            <svg
              class="w-5 h-5 text-purple-500 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            <span>Merge</span>
          </li>
          <li class="flex items-center">
            <svg
              class="w-5 h-5 text-purple-500 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            <span>Share</span>
          </li>
        </ul>
        <button
          @click="selectPlan('ULTRA')"
          :disabled="['ULTRA'].includes(currentPlan)"
          class="w-full mt-4 py-2 px-4 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-400"
        >
          {{ currentPlan === "ULTRA" ? "Current Plan" : "Choose Ultra" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  generatePlanToken,
  commitPlanPurchaseTransaction,
} from "../utils/plan";

export default {
  data() {
    return {
      currentPlan: this.$store.getters.getUser.plan,
      currentUserId: this.$store.getters.getUser._id,
    };
  },
  methods: {
    async selectPlan(plan) {
      try {
        const tokenResponse = await generatePlanToken({
          userId: this.currentUserId,
          planType: plan,
        });
        if (tokenResponse.token) {
          const planPurchaseResponse = await commitPlanPurchaseTransaction({
            token: tokenResponse.token,
          });
          if (planPurchaseResponse.status === "PLAN_PURCHASE_OK") {
            alert("Plan Purchase Successful, New Plan: ", plan.toUpperCase());
            this.$router.push("/profile");
          } else {
            console.log("Error Purchasing Plan");
          }
        } else {
          console.log("Error Generating Token");
        }
      } catch (error) {
        console.log("Error Purchasing Plan", error.message);
      }
    },
  },
};
</script>

<style scoped>
/* Additional custom styling if needed */
</style>
