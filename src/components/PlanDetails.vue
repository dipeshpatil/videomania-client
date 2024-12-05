<template>
  <div
    class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
  >
    <div class="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
      <div>
        <p
          class="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400"
        >
          Our Pricing
        </p>
      </div>
      <h2
        class="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto"
      >
        <span class="relative inline-block">
          <svg
            viewBox="0 0 52 24"
            fill="currentColor"
            class="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
          >
            <defs>
              <pattern
                id="7e5e8ff8-1960-4094-a63a-2a0c0f922d69"
                x="0"
                y="0"
                width=".135"
                height=".30"
              >
                <circle cx="1" cy="1" r=".7"></circle>
              </pattern>
            </defs>
            <rect
              fill="url(#7e5e8ff8-1960-4094-a63a-2a0c0f922d69)"
              width="52"
              height="24"
            ></rect>
          </svg>
          <span class="relative">Transparent</span>
        </span>
        pricing. Pay as you grow.
      </h2>
      <p class="text-base text-gray-700 md:text-lg">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque rem aperiam, eaque ipsa quae.
      </p>
    </div>
    <div
      class="grid max-w-md gap-10 row-gap-5 lg:max-w-screen-lg sm:row-gap-10 lg:grid-cols-3 xl:max-w-screen-lg sm:mx-auto"
    >
      <div
        :class="[
          'flex flex-col justify-between p-8 transition-shadow duration-300 bg-white border rounded shadow-sm sm:items-center hover:shadow',
          currentPlan === 'FREE'
            ? 'border-blue-500 border-4'
            : 'border-gray-300',
        ]"
      >
        <div class="text-center">
          <div class="text-lg text-blue-600 font-semibold">FREE</div>
          <div class="flex items-center justify-center mt-2">
            <div class="mr-1 text-4xl font-bold">50 Credits</div>
          </div>
          <div class="mt-4 space-y-3 flex flex-col items-center">
            <div class="flex items-center text-gray-700 space-x-2">
              <CloudArrowUpIcon class="h-6 w-6 text-blue-600" />
              <span>Upload Videos</span>
            </div>
            <div class="flex items-center text-gray-700 space-x-2">
              <ShareIcon class="h-6 w-6 text-blue-600" />
              <span>Share Videos</span>
            </div>
          </div>
        </div>
        <div>
          <button
            @click="selectPlan('FREE')"
            :disabled="true"
            :class="[
              'inline-flex items-center justify-center w-full h-12 px-6 mt-6 font-medium tracking-wide transition duration-200 rounded shadow-md focus:shadow-outline focus:outline-none',
              true
                ? 'text-gray-100 bg-gray-400'
                : 'text-white bg-blue-500 hover:bg-blue-600',
            ]"
          >
            {{ currentPlan === "FREE" ? "Current Plan" : "Start for free" }}
          </button>
          <p
            class="max-w-xs mt-6 text-xs text-gray-600 sm:text-sm sm:text-center sm:max-w-sm sm:mx-auto"
          >
            Sed ut unde omnis iste natus accusantium doloremque.
          </p>
        </div>
      </div>
      <div
        :class="[
          'flex flex-col justify-between p-8 transition-shadow duration-300 bg-white border rounded shadow-sm sm:items-center hover:shadow',
          currentPlan === 'PRO'
            ? 'border-green-500 border-4'
            : 'border-gray-300',
        ]"
      >
        <div class="absolute inset-x-0 top-0 flex justify-center -mt-3"></div>
        <div class="text-center">
          <div class="text-lg text-green-500 font-semibold">PRO</div>
          <div class="flex items-center justify-center mt-2">
            <div class="mr-1 text-4xl font-bold">500 Credits</div>
          </div>
          <div class="mt-4 space-y-3 flex flex-col items-center">
            <div class="flex items-center text-gray-700 space-x-2">
              <CloudArrowUpIcon class="h-6 w-6 text-green-500" />
              <span>Upload Videos</span>
            </div>
            <div class="flex items-center text-gray-700 space-x-2">
              <ShareIcon class="h-6 w-6 text-green-500" />
              <span>Share Videos</span>
            </div>
            <div class="flex items-center text-gray-700 space-x-2">
              <ScissorsIcon class="h-6 w-6 text-green-500" />
              <span>Trim Videos</span>
            </div>
          </div>
        </div>
        <div>
          <button
            @click="selectPlan('PRO')"
            :disabled="['ULTRA', 'PRO'].includes(currentPlan)"
            :class="[
              'inline-flex items-center justify-center w-full h-12 px-6 mt-6 font-medium tracking-wide transition duration-200 rounded shadow-md focus:shadow-outline focus:outline-none',
              ['ULTRA', 'PRO'].includes(currentPlan)
                ? 'text-gray-100 bg-gray-400'
                : 'text-white bg-green-500 hover:bg-green-600',
            ]"
          >
            {{ currentPlan === "PRO" ? "Current Plan" : "Buy Pro" }}
          </button>
          <p
            class="max-w-xs mt-6 text-xs text-gray-600 sm:text-sm sm:text-center sm:max-w-sm sm:mx-auto"
          >
            Sed ut unde omnis iste natus accusantium doloremque.
          </p>
        </div>
      </div>
      <div
        :class="[
          'flex flex-col justify-between p-8 transition-shadow duration-300 bg-white border rounded shadow-sm sm:items-center hover:shadow',
          currentPlan === 'ULTRA'
            ? 'border-purple-500 border-4 bg-purple-50'
            : 'border-gray-300',
        ]"
      >
        <div class="text-center">
          <div class="text-lg text-purple-700 font-semibold">ULTRA</div>
          <div class="flex items-center justify-center mt-2">
            <div class="mr-1 text-4xl font-bold">1500 Credits</div>
          </div>
          <div class="mt-4 space-y-3 flex flex-col items-center">
            <div class="flex items-center text-gray-700 space-x-2">
              <CloudArrowUpIcon class="h-6 w-6 text-purple-700" />
              <span>Upload Videos</span>
            </div>
            <div class="flex items-center text-gray-700 space-x-2">
              <ShareIcon class="h-6 w-6 text-purple-700" />
              <span>Share Videos</span>
            </div>
            <div class="flex items-center text-gray-700 space-x-2">
              <ScissorsIcon class="h-6 w-6 text-purple-700" />
              <span>Trim Videos</span>
            </div>
            <div class="flex items-center text-gray-700 space-x-2">
              <ViewColumnsIcon class="h-6 w-6 text-purple-700" />
              <span>Merge Videos</span>
            </div>
          </div>
        </div>
        <div>
          <button
            @click="selectPlan('ULTRA')"
            :disabled="['ULTRA'].includes(currentPlan)"
            :class="[
              'inline-flex items-center justify-center w-full h-12 px-6 mt-6 font-medium tracking-wide transition duration-200 rounded shadow-md focus:shadow-outline focus:outline-none',
              ['ULTRA'].includes(currentPlan)
                ? 'text-gray-100 bg-gray-400'
                : 'text-white bg-purple-700 hover:bg-purple-800',
            ]"
          >
            {{ currentPlan === "ULTRA" ? "Current Plan" : "Buy Ultra" }}
          </button>
          <p
            class="max-w-xs mt-6 text-xs text-gray-600 sm:text-sm sm:text-center sm:max-w-sm sm:mx-auto"
          >
            Sed ut unde omnis iste natus accusantium doloremque.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  CloudArrowUpIcon,
  ShareIcon,
  ScissorsIcon,
  ViewColumnsIcon,
} from "@heroicons/vue/24/outline";

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
  components: {
    ViewColumnsIcon,
    CloudArrowUpIcon,
    ShareIcon,
    ScissorsIcon,
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
