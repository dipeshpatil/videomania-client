<template>
  <h2 class="text-xl font-semibold p-4">Video Links</h2>
  <div class="overflow-x-auto">
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
            User
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(videoLink, index) in links"
          :key="videoLink._id"
          class="text-sm hover:bg-gray-50"
        >
          <td class="px-6 py-4 text-gray-800">{{ videoLink.videoId.title }}</td>
          <td class="px-6 py-4 text-gray-800">
            <a
              :href="videoLink.link"
              target="_blank"
              class="text-blue-600 hover:text-blue-800 underline"
            >
              {{ videoLink.link }}
            </a>
          </td>
          <td>
            <span
              :class="
                formattedLinkDetails[index].isExpired
                  ? 'bg-red-100 text-red-500 text-sm ml-6 rounded-full px-3 py-1'
                  : 'bg-blue-100 text-blue-500 text-sm ml-6 rounded-full px-3 py-1'
              "
            >
              {{
                formattedLinkDetails[index].isExpired
                  ? "Expired"
                  : formattedLinkDetails[index].linkStatus
              }}
            </span>
          </td>
          <td class="px-6 py-4 text-gray-800">{{ videoLink.user }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getUserLinks } from "../utils/user";

export default {
  data() {
    return {
      links: [],
    };
  },
  computed: {
    formattedLinkDetails() {
      return this.links.map((link) => {
        return {
          ...link,
          linkStatus: `< ${this.formatExpiryTime(link.expiryTime)}m`,
          isExpired: this.formatExpiryTime(link.expiryTime) === "Expired",
        };
      });
    },
  },
  mounted() {
    this.fetchLinks(); // Fetch the video data when the component is mounted
  },
  methods: {
    // Fetch the video data from API or local storage
    async fetchLinks() {
      try {
        const linksResult = await getUserLinks(); // Replace with your API endpoint
        const { links } = linksResult;
        console.log(links);

        this.links = links; // Store the fetched data in the videos array
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    },
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
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
        // Link has expired
        return {
          status: "Expired",
          expiryDate: expiryDate.toLocaleString(),
        };
      } else {
        // Link is still valid, calculate minutes until expiration
        const minutesUntilExpiry = Math.ceil(timeDifference / 60000); // Convert ms to minutes
        return {
          status: minutesUntilExpiry,
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
