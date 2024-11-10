<template>
  <div class="max-w-4xl mx-auto mt-10">
    <h2 class="text-2xl font-bold text-center mb-6">
      Purchase Credits for Existing Plan
    </h2>
    <!-- Top Up Credits Section -->
    <div class="mt-10 p-6 border rounded-lg bg-gray-50">
      <h3 class="text-xl font-semibold mb-4">Top Up Credits</h3>
      <div class="flex flex-col md:flex-row items-center gap-4">
        <!-- Input for Number of Credits -->
        <div class="flex flex-col w-full md:w-auto">
          <label for="credits" class="text-gray-700 font-medium mb-2"
            >Enter Credits</label
          >
          <input
            id="credits"
            type="number"
            v-model.number="creditCount"
            min="1"
            class="p-2 border rounded-md"
            placeholder="Number of credits"
          />
        </div>

        <!-- Display Calculated Price -->
        <div class="flex flex-col w-full md:w-auto">
          <label class="text-gray-700 font-medium mb-2">Total Price</label>
          <p class="text-lg font-semibold text-gray-800">
            ${{ calculatedPrice.toFixed(2) }}
          </p>
        </div>

        <!-- Purchase Credits Button -->
        <button
          @click="purchaseCredits"
          class="mt-4 ml-6 md:mt-0 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Purchase Credits
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      creditCount: 1, // Default to 1 for initial display
      pricePerCredit: 0.1, // Set per-credit rate, e.g., $0.10
    };
  },
  computed: {
    calculatedPrice() {
      return this.creditCount * this.pricePerCredit;
    },
  },
  methods: {
    purchaseCredits() {
      alert(
        `You have purchased ${
          this.creditCount
        } credits for $${this.calculatedPrice.toFixed(2)}.`
      );
      // Add further purchase logic here if necessary
    },
  },
};
</script>

<style scoped>
/* Additional styling if needed */
</style>
