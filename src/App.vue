<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div class="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
export default {
  components: {
    Navbar,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped></style>
