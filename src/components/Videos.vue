<template>
  <h2 class="text-xl font-semibold p-4">Upload Video</h2>
  <VideoUpload @video-uploaded="handleVideoUploaded" />

  <h2 class="text-xl font-semibold p-4">Videos</h2>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white rounded-lg">
      <thead>
        <tr class="text-left bg-gray-50">
          <th class="px-6 py-3 text-sm font-semibold text-gray-700 uppercase">
            Title
          </th>
          <th class="px-6 py-3 text-sm font-semibold text-gray-700 uppercase">
            Type
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
          <td>
            <span
              :class="
                'text-sm rounded-full px-3 py-1 ' +
                formattedVideoDetails[index].typeStyle
              "
            >
              {{ formattedVideoDetails[index].type }}
            </span>
          </td>
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
import VideoUpload from "./video/VideoUpload.vue";
import { getUserVideos } from "../utils/user";
import { formatDate, formatFileSize } from "../utils/common";

export default {
  components: {
    VideoUpload,
  },
  data() {
    return {
      videos: [],
    };
  },
  computed: {
    formattedVideoDetails() {
      return this.videos.map((video) => {
        return {
          ...video,
          type: !video.title.startsWith("trimmed_")
            ? video.title.startsWith("merge")
              ? "MERGE"
              : "UPLOAD"
            : "TRIM",
          typeStyle: !video.title.startsWith("trimmed_")
            ? video.title.startsWith("merge")
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
            : "bg-blue-100 text-blue-800",
        };
      });
    },
  },
  mounted() {
    this.fetchVideos(); // Fetch the video data when the component is mounted
  },
  methods: {
    formatDate,
    async fetchVideos() {
      try {
        const videosResult = await getUserVideos(); // Replace with your API endpoint
        const { videos } = videosResult;
        this.videos = videos; // Store the fetched data in the videos array
        console.log(videos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    },
    formatFileSize,
    handleVideoUploaded(result) {
      console.log("Notification:", result);
      this.fetchVideos();
    },
  },
};
</script>

<style scoped>
/* Custom styles can be added here if needed */
</style>
