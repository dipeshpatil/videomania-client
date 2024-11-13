<template>
  <div class="video-container">
    <div v-if="videoUrl">
      <video
        :src="videoUrl"
        controls
        class="w-full max-w-4xl mx-auto"
        @error="handleError"
      >
        Your browser does not support the video tag.
      </video>
    </div>

    <div v-else class="text-center text-red-500">
      Link Expired or Invalid URL
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      linkId: "", // Video URL from path param or prop
      videoUrl: null,
    };
  },
  mounted() {
    this.linkId = this.$route.params.linkId;
    this.videoUrl = `http://localhost:3000/video/share/${
      this.linkId
    }?token=${localStorage.getItem("token")}`;
  },
  methods: {
    handleError() {
      console.error("Error loading video");
    },
  },
};
</script>

<style scoped>
.video-container {
  max-width: 80%;
  margin: 0 auto;
  padding: 20px;
}

.video-container video {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.text-xl {
  font-size: 1.25rem;
}

.text-center {
  text-align: center;
}
</style>
