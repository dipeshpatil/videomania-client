<template>
  <div
    v-if="loading"
    class="flex items-center justify-center space-x-2"
    :class="{ 'h-screen': fullscreen }"
  >
    <div
      class="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500 border-opacity-75"
    ></div>
    <span class="text-blue-500 text-sm font-medium" v-if="message">{{
      message
    }}</span>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    message: {
      type: String,
      default: "Loading...",
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
/* Additional styling can be added here if necessary */
</style>
