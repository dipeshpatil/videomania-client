<template>
  <div class="container mx-auto p-4">
    <h1 class="text-xl font-bold mb-4">Your Videos</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
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
            <span class="font-bold">Size:</span>
            {{ formatFileSize(video.size) }}
          </p>
          <p class="text-sm text-gray-600">
            <span class="font-bold">Duration:</span>
            {{ video.duration.toFixed(2) }} sec
          </p>
          <p class="text-sm text-gray-600">
            <span class="font-bold">Uploaded:</span>
            {{ formatDate(video.createdAt, false) }}
          </p>
          <div class="flex justify-between items-center mt-4 rounded-lg">
            <div class="flex space-x-2">
              <button
                v-if="enableRenameFeature"
                @click="handleRenameVideoModal(video)"
                class="flex items-center text-white bg-green-500 hover:bg-green-600 px-2 py-1 rounded-md space-x-1"
              >
                <PencilIcon class="h-6 w-6" />
              </button>
              <button
                @click="shareVideo(video._id)"
                class="flex items-center text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded-md space-x-1"
              >
                <ShareIcon class="h-6 w-6" />
              </button>
              <button
                v-if="enableTrimFeature"
                @click="handleTrimVideoModal(video)"
                class="flex items-center text-white bg-orange-500 hover:bg-orange-600 px-2 py-1 rounded-md space-x-1"
              >
                <ScissorsIcon class="h-6 w-6" />
              </button>
              <button
                v-if="enableDeleteFeature"
                @click="handleDeleteVideoModal(video)"
                class="flex items-center text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded-md space-x-1"
              >
                <TrashIcon class="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div>
    <!-- Modal -->
    <div
      v-if="isShareModalOpen"
      class="fixed inset-0 flex items-center justify-center z-50"
    >
      <!-- Backdrop -->
      <div
        class="fixed inset-0 bg-black opacity-50"
        @click="
          this.isShareModalOpen = false;
          this.generatedLink = null;
          this.generateLinkError = null;
        "
      ></div>

      <!-- Modal Content -->
      <div
        class="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full mx-4 md:mx-auto relative z-10"
      >
        <h2 class="text-xl font-semibold mb-4">Generate Share Link</h2>

        <!-- Expiry Time Selection and Generate Button -->
        <div class="flex items-center space-x-2 mb-4">
          <!-- Expiry Time Dropdown -->
          <select
            id="expiry"
            v-model="selectedExpiry"
            class="flex-1 bg-gray-100 border-gray-300 rounded-md p-2"
          >
            <option selected value="1h">1 Hour</option>
            <option value="1d">24 Hours</option>
            <option value="7d">7 Days</option>
            <option value="1m">30 Days</option>
            <option value="3m">90 Days</option>
            <option value="1y">1 Year</option>
          </select>

          <!-- Generate Button -->
          <button
            @click="generateLink"
            class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition"
          >
            Generate Link
          </button>
        </div>

        <!-- Generated Link Display -->
        <div v-if="generatedLink" class="mt-4 p-2 bg-gray-100 rounded-md">
          <label class="block text-gray-700 font-semibold"
            >Your Share Link:</label
          >
          <div class="flex items-center mt-1">
            <input
              type="text"
              :value="generatedLink"
              readonly
              class="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
            />
            <button
              @click="copyToClipBoard(generatedLink)"
              class="ml-2 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              Copy
            </button>
          </div>
          <div v-if="generatedLinkExpiresAt" class="text-sm mt-2 text-gray-500">
            <span class="font-bold">Expires At:&nbsp;</span
            >{{ generatedLinkExpiresAt }}
          </div>
        </div>

        <!-- Generated Link Display -->
        <div
          v-if="generateLinkError"
          class="mt-4 p-2 bg-red-100 text-center text-red-500 rounded-md"
        >
          {{ generateLinkError }}
        </div>

        <!-- Modal Footer -->
        <!-- <div class="flex justify-end mt-4">
          <button
            @click="
              this.isShareModalOpen = false;
              this.generatedLink = null;
              this.generateLinkError = null;
            "
            class="btn-secondary"
          >
            Close
          </button>
        </div> -->
      </div>
    </div>
  </div>

  <div>
    <!-- Modal -->
    <div
      v-if="isRenameModalOpen"
      class="fixed inset-0 flex items-center justify-center z-50"
    >
      <!-- Backdrop -->
      <div
        class="fixed inset-0 bg-black opacity-50"
        @click="
          this.isRenameModalOpen = false;
          this.renameSuccess = null;
          this.renameError = null;
        "
      ></div>

      <!-- Modal Content -->
      <div
        class="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full mx-4 md:mx-auto relative z-10"
      >
        <h2 class="text-xl font-semibold mb-4">Rename Video Title</h2>

        <div class="flex items-center space-x-2 mb-4">
          <!-- Text Input for Expiry Time -->
          <input
            type="text"
            v-model="renameVideoTitle"
            placeholder="New Video Title"
            class="flex-1 border-gray-300 rounded-md p-2 bg-gray-100"
          />

          <!-- Rename Button -->
          <button
            @click="handleRenameClick"
            class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition"
          >
            Rename
          </button>
        </div>

        <!-- Generated Link Display -->
        <div
          v-if="renameError"
          class="mt-4 p-2 bg-red-100 text-center text-red-500 rounded-md"
        >
          {{ renameError }}
        </div>
        <div
          v-if="renameSuccess"
          class="mt-4 p-2 bg-green-50 text-center text-green-500 rounded-md"
        >
          {{ renameSuccess }}
        </div>
      </div>
    </div>
  </div>

  <div>
    <!-- Modal -->
    <div
      v-if="isTrimVideoModalOpen"
      class="fixed inset-0 flex items-center justify-center z-50"
    >
      <!-- Backdrop -->
      <div
        class="fixed inset-0 bg-black opacity-50"
        @click="
          this.isTrimVideoModalOpen = false;
          this.trimVideoError = null;
          this.trimVideoSuccess = null;
        "
      ></div>

      <!-- Modal Content -->
      <div
        class="bg-white rounded-lg shadow-lg p-8 max-w-xl w-full mx-4 md:mx-auto relative z-10"
      >
        <h2 class="text-xl font-semibold mb-4">Trim Video</h2>

        <div class="flex items-center space-x-2 mb-4">
          <!-- Text Input for Start Time -->
          <input
            type="number"
            v-model="trimStartTime"
            placeholder="Start Time..."
            class="flex-1 border-gray-300 rounded-md p-2"
          />

          <!-- Text Input for End Time -->
          <input
            type="number"
            v-model="trimEndTime"
            placeholder="End Time..."
            class="flex-1 border-gray-300 rounded-md p-2"
          />

          <!-- Trim Button -->
          <button
            @click="handleTrimVideo"
            class="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition"
          >
            Trim
          </button>
        </div>

        <!-- Generated Link Display -->
        <div
          v-if="trimVideoError"
          class="mt-4 p-2 bg-red-100 text-center text-red-500 rounded-md"
        >
          {{ trimVideoError }}
        </div>
        <div
          v-if="trimVideoSuccess"
          class="mt-4 p-2 bg-green-50 text-center text-green-500 rounded-md"
        >
          {{ trimVideoSuccess }}
        </div>
      </div>
    </div>
  </div>

  <div>
    <!-- Modal -->
    <div
      v-if="isDeleteVideoModalOpen"
      class="fixed inset-0 flex items-center justify-center z-50"
    >
      <!-- Backdrop -->
      <div
        class="fixed inset-0 bg-black opacity-50"
        @click="
          isDeleteVideoModalOpen = false;
          deleteVideoError = null;
          deleteVideoSuccess = null;
          isDeleting = false;
        "
      ></div>

      <!-- Modal Content -->
      <div
        class="bg-white rounded-lg p-6 max-w-sm w-full mx-2 sm:mx-auto relative z-10"
      >
        <h3 class="text-l mb-4">
          Delete
          <span class="font-semibold underline">{{ deleteVideoTitle }}</span> ?
        </h3>

        <div class="flex items-center space-x-4">
          <button
            :disabled="isDeleting"
            @click="handleDeleteVideo"
            :class="[
              'flex-1 py-2 px-4 rounded-md transition',
              isDeleting
                ? 'bg-gray-100 text-gray-800'
                : 'bg-red-500 hover:bg-red-600 text-white',
            ]"
          >
            Delete
          </button>
          <button
            :disabled="isDeleting"
            @click="
              isDeleteVideoModalOpen = false;
              deleteVideoId = null;
              deleteVideoTitle = null;
              isDeleting = false;
            "
            :class="[
              'flex-1 py-2 px-4 rounded-md transition',
              isDeleting
                ? 'bg-gray-100 text-gray-800'
                : 'bg-gray-400 hover:bg-gray-600 text-white',
            ]"
          >
            {{ deleteVideoSuccess ? "Close" : "Cancel" }}
          </button>
        </div>

        <!-- Generated Link Display -->
        <div
          v-if="deleteVideoError"
          class="mt-4 p-2 bg-red-100 text-center text-red-500 rounded-md"
        >
          {{ deleteVideoError }}
        </div>
        <div
          v-if="deleteVideoSuccess"
          class="mt-4 p-2 bg-green-50 text-center text-green-500 rounded-md"
        >
          {{ deleteVideoSuccess }}
        </div>
      </div>
    </div>
  </div>

  <Pagination
    :total-items="totalItems"
    :items-per-page="itemsPerPage"
    @page-changed="handlePageChange"
  />
</template>

<script>
import { getUserVideos, getVideoURL, deleteVideo } from "../../utils/user";
import {
  generateShareLink,
  renameVideoTitle,
  trimVideo,
} from "../../utils/video";
import {
  getMinutes,
  copyToClipBoard,
  formatDate,
  formatFileSize,
} from "../../utils/common";

import Pagination from "../Pagination.vue";

import {
  PencilIcon,
  TrashIcon,
  ShareIcon,
  ScissorsIcon,
} from "@heroicons/vue/24/outline";

export default {
  data() {
    return {
      videos: [],
      videoURLs: [],

      isShareModalOpen: false,
      shareVideoId: null,
      selectedExpiry: "1h",
      generatedLink: "",
      generateLinkError: null,
      generatedLinkExpiresAt: "",

      renameVideoTitle: "",
      isRenameModalOpen: false,
      renameVideoId: null,
      renameError: null,
      renameSuccess: null,

      isTrimVideoModalOpen: false,
      trimVideoId: null,
      trimVideoError: null,
      trimVideoSuccess: null,
      trimStartTime: 0,
      trimEndTime: 0,

      isDeleteVideoModalOpen: false,
      deleteVideoId: null,
      deleteVideoTitle: null,
      deleteVideoSuccess: null,
      deleteVideoError: null,
      isDeleting: false,

      enableTrimFeature:
        this.$store.getters.getUser.permissions.includes("TRIM"),
      enableRenameFeature:
        JSON.parse(localStorage.getItem("rename_feature_enabled")) || false,
      enableDeleteFeature:
        JSON.parse(localStorage.getItem("delete_feature_enabled")) || false,

      itemsPerPage: 6,
      currentPage: 1,
      totalItems: 0,
    };
  },
  components: {
    Pagination,
    PencilIcon,
    TrashIcon,
    ShareIcon,
    ScissorsIcon,
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
    this.fetchVideos();
  },
  methods: {
    copyToClipBoard,
    formatDate,
    formatFileSize,
    async fetchVideos() {
      try {
        const videosResult = await getUserVideos({
          limit: this.itemsPerPage,
          pageNumber: this.currentPage,
        });
        const { videos, itemCount } = videosResult;
        this.totalItems = itemCount;
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
    shareVideo(videoId) {
      this.shareVideoId = videoId;
      this.isShareModalOpen = true;
    },
    async generateLink() {
      this.generateLinkError = null;
      this.generatedLink = null;
      this.generatedLinkExpiresAt = null;
      setTimeout(async () => {
        const expiryTime = getMinutes(this.selectedExpiry);
        console.log(expiryTime);
        const videoId = this.shareVideoId;
        const response = await generateShareLink({
          videoId,
          expiryTime,
        });
        const { status, link, expiresAt } = response;
        if (status === 200) {
          this.generatedLink = `http://localhost:5173/view/${link}`;
          this.generateLinkError = null;
          this.generatingLink = false;
          this.generatedLinkExpiresAt = this.formatDate(new Date(expiresAt));
        } else {
          this.generatedLink = null;
          this.generateLinkError =
            "Error Generating Link, Check Credits or Try Again";
          this.generatingLink = false;
          this.generatedLinkExpiresAt = null;
        }
      }, 500);
    },
    handleRenameVideoModal(video) {
      if (!this.enableRenameFeature) return;
      const { title, _id } = video;
      this.renameVideoTitle = title;
      this.renameVideoId = _id;
      this.isRenameModalOpen = true;
    },
    async handleRenameClick() {
      if (!this.enableRenameFeature) return;
      try {
        const response = await renameVideoTitle({
          videoId: this.renameVideoId,
          videoName: this.renameVideoTitle,
        });
        const { status, errors } = response;
        if (status === 200) {
          this.renameSuccess = "Rename Successful!";
          this.renameError = null;
          const videoIndex = this.videos.findIndex(
            (v) => v._id === this.renameVideoId
          );
          this.videos[videoIndex].title = this.renameVideoTitle;
        } else {
          this.renameError = errors;
          this.renameSuccess = null;
        }
      } catch (error) {}
    },
    handleTrimVideoModal(video) {
      if (!this.enableTrimFeature) return;
      this.trimVideoId = video._id;
      this.isTrimVideoModalOpen = true;
      this.trimEndTime = video.duration.toFixed(2);
    },
    async handleTrimVideo() {
      if (!this.enableTrimFeature) return;
      const response = await trimVideo({
        startTime: this.trimStartTime,
        endTime: this.trimEndTime,
        videoId: this.trimVideoId,
      });
      const { status } = response;
      if (status === 200) {
        this.trimVideoSuccess = "Video Trim Successful";
        this.trimVideoError = null;
        this.videos.unshift({
          title: response.title,
          filePath: response.filePath,
          size: response.size,
          duration: response.duration,
          _id: response._id,
          createdAt: response.createdAt,
        });
        this.videoURLs.unshift(response.filePath);
      } else {
        this.trimVideoSuccess = null;
        this.trimVideoError = "Trim Error!";
      }
    },
    handlePageChange(newPage) {
      this.currentPage = newPage;
      this.fetchVideos();
    },
    handleDeleteVideoModal(video) {
      if (!this.enableDeleteFeature) return;
      this.deleteVideoId = video._id;
      this.deleteVideoTitle = video.title;
      this.isDeleteVideoModalOpen = true;
    },
    async handleDeleteVideo() {
      this.isDeleting = true;
      const response = await deleteVideo(this.deleteVideoId);
      if (response.deleted) {
        this.deleteVideoError = null;
        this.deleteVideoSuccess = `${this.deleteVideoTitle} Deleted Successfully`;
        this.videos = this.videos.filter(
          (video) => video._id !== this.deleteVideoId
        );
      } else {
        this.deleteVideoError = `Error deleting ${this.deleteVideoTitle}`;
        this.deleteVideoSuccess = null;
      }
      this.isDeleting = false;
    },
  },
};
</script>

<style scoped>
/* Additional styling can go here */
/* Basic styling for the button */
.btn-primary {
  background-color: #3b82f6;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #2563eb;
}

.btn-secondary {
  background-color: #e5e7eb;
  color: #374151;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-secondary:hover {
  background-color: #d1d5db;
}

/* Modal content styling */
.fixed {
  position: fixed;
}

.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.bg-black {
  background-color: black;
}

.bg-white {
  background-color: white;
}

.opacity-50 {
  opacity: 0.5;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.z-50 {
  z-index: 50;
}

.z-10 {
  z-index: 10;
}

.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.rounded-lg {
  border-radius: 8px;
}

.p-6 {
  padding: 1.5rem;
}

.max-w-sm {
  max-width: 24rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
</style>
