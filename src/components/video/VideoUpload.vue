<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold text-center mb-6">Upload Video</h2>

    <!-- Video File Upload Section -->
    <div>
      <label for="videoFile" class="block text-gray-700 font-medium mb-2"
        >Select a video file to upload</label
      >
      <input
        id="videoFile"
        type="file"
        accept="video/*"
        @change="handleFileChange"
        class="w-full p-2 border rounded-lg"
      />

      <!-- Show File Name after Selection -->
      <div v-if="selectedFile" class="mt-4 text-gray-700">
        <p><strong>Selected File:</strong> {{ selectedFile.name }}</p>
      </div>

      <!-- Indeterminate Progress Bar -->
      <div v-if="isUploading" class="relative pt-1">
        <div class="flex mb-2 items-center justify-between">
          <div>
            <span class="text-xs font-semibold inline-block py-1 uppercase">
              Uploading...
            </span>
          </div>
        </div>
        <div class="flex mb-2">
          <div class="w-full">
            <div class="progress-bar-container">
              <div class="progress-bar"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Upload Button -->
      <button
        v-if="selectedFile && !isUploading"
        @click="uploadVideo"
        class="mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition ease-in-out duration-200"
      >
        Upload Video
      </button>
    </div>

    <!-- Success Message -->
    <div
      v-if="uploadSuccess"
      class="mt-6 text-green-600 font-semibold text-center"
    >
      Video uploaded successfully!
    </div>

    <!-- Error Message -->
    <div v-if="uploadError" class="mt-6 text-red-600 font-semibold text-center">
      Error uploading video. Please try again.
    </div>
  </div>
</template>

<script>
import { uploadVideoDetails } from "../../utils/video";

export default {
  data() {
    return {
      selectedFile: null, // The selected video file
      isUploading: false, // Flag to indicate if the video is being uploaded
      uploadSuccess: false, // Flag to show success message
      uploadError: false, // Flag to show error message
    };
  },
  methods: {
    handleFileChange(event) {
      // Get the file from the input
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        this.uploadSuccess = false;
        this.uploadError = false;
      }
    },
    async uploadVideo() {
      if (!this.selectedFile) return;

      this.isUploading = true;

      // Create FormData to send file in the request body
      const formData = new FormData();
      formData.append("file", this.selectedFile);

      try {
        const response = await uploadVideoDetails(formData);
        if (response.status === 200) {
          this.uploadSuccess = true;
          this.selectedFile = null;
          this.$emit("video-uploaded", { msg: "Upload Video" });
        } else {
          this.uploadError = true;
        }
      } catch (error) {
        console.error("Error uploading video:", error);
        this.uploadError = true;
      } finally {
        this.isUploading = false;
      }
    },
  },
};
</script>

<style scoped>
button[disabled] {
  background-color: #ccc;
  cursor: not-allowed;
}

.progress-bar-container {
  position: relative;
  height: 8px;
  background: #f3f3f3;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.2) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  animation: indeterminate 1.5s infinite ease-in-out;
}

@keyframes indeterminate {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
