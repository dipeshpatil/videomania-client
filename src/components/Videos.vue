<template>
  <div class="overflow-x-auto mt-8">
    <table class="min-w-full bg-white rounded-lg">
      <thead>
        <tr class="text-left bg-gray-50">
          <th class="px-6 py-3 text-sm font-semibold text-gray-700 uppercase">
            Title
          </th>
          <th class="px-6 py-3 text-sm font-semibold text-gray-700 uppercase">
            File Path
          </th>
          <th class="px-6 py-3 text-sm font-semibold text-gray-700 uppercase">
            Size
          </th>
          <th class="px-6 py-3 text-sm font-semibold text-gray-700 uppercase">
            Duration (s)
          </th>
          <th class="px-6 py-3 text-sm font-semibold text-gray-700 uppercase">
            Created At
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(video, index) in videos"
          :key="video._id"
          class="text-sm hover:bg-gray-50"
        >
          <td class="px-6 py-4 text-gray-800">{{ video.title }}</td>
          <td class="px-6 py-4 text-gray-800">
            <a
              :href="video.filePath"
              target="_blank"
              class="text-blue-600 hover:text-blue-800 underline"
              >View File</a
            >
          </td>
          <td class="px-6 py-4 text-gray-800">
            {{ formatFileSize(video.size) }}
          </td>
          <td class="px-6 py-4 text-gray-800">
            {{ video.duration.toFixed(2) }}
          </td>
          <td class="px-6 py-4 text-gray-800">
            {{ formatDate(video.createdAt) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getUserVideos } from "../utils/video";

export default {
  data() {
    return {
      videos: [],
    };
  },
  mounted() {
    this.fetchVideos(); // Fetch the video data when the component is mounted
  },
  methods: {
    // Fetch the video data from API or local storage
    async fetchVideos() {
      try {
        const videosResult = await getUserVideos(); // Replace with your API endpoint
        const { videos } = videosResult;
        this.videos = videos; // Store the fetched data in the videos array
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    },
    // Format file size (in bytes) to a more human-readable format
    formatFileSize(sizeInBytes) {
      const sizeInMB = sizeInBytes / (1024 * 1024);
      return sizeInMB.toFixed(2) + " MB";
    },
    // Format the timestamp to a readable date
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
};
</script>

<style scoped>
/* Custom styles can be added here if needed */
</style>
