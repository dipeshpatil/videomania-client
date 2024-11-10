<template>
  <div class="container mx-auto p-4">
    <h1 class="text-xl font-bold mb-4">Your Videos</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(video, index) in videos"
        :key="video._id"
        class="bg-white shadow-lg rounded-lg overflow-hidden"
      >
        <video
          :src="videoURLs[index]"
          controls
          class="w-full h-40 object-cover"
        ></video>
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-800 truncate">
            {{ video.title }}
          </h3>
          <p class="text-sm text-gray-600 mt-1">
            Size: {{ formatFileSize(video.size) }}
          </p>
          <p class="text-sm text-gray-600">
            Duration: {{ video.duration }} sec
          </p>
          <p class="text-sm text-gray-600">
            Uploaded: {{ formatDate(video.createdAt) }}
          </p>
          <div
            class="flex justify-between items-center mt-2 p-2 bg-gray-100 rounded-lg"
          >
            <a
              :href="video.filePath"
              target="_blank"
              class="text-blue-500 hover:underline"
            >
              Download
            </a>
            <div class="flex space-x-2">
              <button
                @click="renameVideo(video)"
                class="text-white bg-green-500 hover:bg-green-600 px-2 py-1 rounded-md"
              >
                Rename Title
              </button>
              <button
                @click="shareVideo(video)"
                class="text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded-md"
              >
                Share
              </button>
              <button
                @click="deleteVideo(video._id)"
                class="text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserVideos, getVideoURL } from "../../utils/user";

export default {
  data() {
    return {
      videos: [],
      videoURLs: [],
    };
  },
  computed: {
    async formattedVideoDetails() {
      return this.videos.map(async (video) => {
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
  async mounted() {
    this.fetchVideos(); // Fetch the video data when the component is mounted
  },
  methods: {
    // Fetch the video data from API or local storage
    async fetchVideos() {
      try {
        const videosResult = await getUserVideos(); // Replace with your API endpoint
        const { videos } = videosResult;
        this.videos = videos.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        this.videoURLs = await Promise.all(
          this.videos.map(async (video) => {
            const { videoURL } = await getVideoURL(video._id);
            return videoURL;
          })
        );
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
/* Additional styling can go here */
</style>
