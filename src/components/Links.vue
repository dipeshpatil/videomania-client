<template>
  <h2 class="text-xl font-semibold p-4">Video Links</h2>
  <div v-if="!loading" class="overflow-x-auto">
    <table class="min-w-full bg-white rounded-lg">
      <thead>
        <tr class="text-left bg-gray-50">
          <th class="px-6 py-3 text-sm font-semibold text-gray-700 uppercase">
            Video Title
          </th>
          <th class="px-6 py-3 text-sm font-semibold text-gray-700 uppercase">
            Link
          </th>
          <th class="px-6 py-3 text-sm font-semibold text-gray-700 uppercase">
            Expiry Time
          </th>
          <th class="px-6 py-3 text-sm font-semibold text-gray-700 uppercase">
            Author
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(videoLink, index) in links"
          :key="videoLink?._id"
          class="text-sm hover:bg-gray-50"
        >
          <td class="px-6 py-4 text-gray-800">
            {{ videoLink?.videoId?.title || '<Video Deleted>' }}
          </td>
          <td class="px-6 py-4 text-gray-800">
            <a
              v-if="videoLink?.videoId?.title"
              :href="`/view/${videoLink?.link}`"
              target="_blank"
              class="text-blue-600 hover:text-blue-800 underline"
            >
              {{ videoLink?.link }}
            </a>
            <span v-else>{{ videoLink?.link }}</span>
          </td>
          <td>
            <span
              :class="
                formattedLinkDetails[index]?.isExpired
                  ? 'bg-red-100 text-red-500 text-sm ml-6 rounded-full px-3 py-1'
                  : 'bg-blue-100 text-blue-500 text-sm ml-6 rounded-full px-3 py-1'
              "
            >
              {{
                formattedLinkDetails[index]?.isExpired
                  ? "Expired"
                  : formattedLinkDetails[index]?.linkStatus
              }}
            </span>
          </td>
          <td class="px-6 py-4 text-gray-800">{{ videoLink?.user?.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Loader :loading="loading" :fullscreen="true" />
</template>

<script>
import { getRemainingTimeFromMinutes } from "../utils/common";
import { getUserLinks } from "../utils/user";
import Loader from "./Loader.vue";

export default {
  components: {
    Loader,
  },
  data() {
    return {
      links: [],
      loading: true,
    };
  },
  computed: {
    formattedLinkDetails() {
      return this.links.map((link) => {
        return {
          ...link,
          linkStatus: `< ${this.formatExpiryTime(link.expiryTime)}`,
          isExpired: this.formatExpiryTime(link.expiryTime) === "Expired",
        };
      });
    },
  },
  mounted() {
    this.fetchLinks(); // Fetch the video data when the component is mounted
  },
  methods: {
    async fetchLinks() {
      try {
        const linksResult = await getUserLinks(); // Replace with your API endpoint
        const { links } = linksResult;
        this.links = links; // Store the fetched data in the videos array
        this.loading = false;
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    },
    formatExpiryTime(expiryTime) {
      const et = this.checkExpiry(expiryTime);
      return et.status;
    },
    checkExpiry(expiryTime) {
      const expiryDate = new Date(expiryTime);
      const currentDate = new Date();
      const timeDifference = expiryDate - currentDate;

      if (timeDifference < 0) {
        return {
          status: "Expired",
          expiryDate: expiryDate.toLocaleString(),
        };
      } else {
        return {
          status: getRemainingTimeFromMinutes(
            Math.ceil(timeDifference / 60000)
          ),
          expiryDate: expiryDate.toLocaleString(),
        };
      }
    },
  },
};
</script>

<style scoped>
/* Custom styles can be added here if needed */
</style>
