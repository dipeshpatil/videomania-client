<template>
  <div
    class="fixed bottom-0 left-0 w-full flex items-center justify-center bg-gray-300 py-3 shadow-md"
  >
    <!-- Previous Button -->
    <button
      @click="goToPreviousPage"
      :disabled="currentPage === 1"
      class="px-2 py-1 bg-gray-200 text-gray-600 rounded-md disabled:bg-gray-300 disabled:text-gray-400"
    >
      Previous
    </button>

    <!-- Page Numbers -->
    <span class="text-gray-700 font-semibold mx-4">
      Page {{ currentPage }} of {{ totalPages }}
    </span>

    <!-- Next Button -->
    <button
      @click="goToNextPage"
      :disabled="currentPage === totalPages"
      class="px-2 py-1 bg-gray-200 text-gray-600 rounded-md disabled:bg-gray-300 disabled:text-gray-400"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  props: {
    totalItems: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
  },
  methods: {
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.$emit("page-changed", this.currentPage);
      }
    },
    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.$emit("page-changed", this.currentPage);
      }
    },
  },
};
</script>

<style scoped>
/* Pagination styling to fix it at the bottom */
.fixed {
  position: fixed;
  z-index: 50; /* Ensure it stays above other content */
}
</style>
