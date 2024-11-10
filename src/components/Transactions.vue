<template>
  <div class="transactions-container">
    <h2 class="text-2xl font-semibold mb-6 text-gray-800">
      Transaction History
    </h2>

    <!-- Loading State -->
    <div v-if="loading" class="text-center">
      <div class="loading-spinner"></div>
      Loading...
    </div>

    <!-- No Transactions State -->
    <div
      v-if="!loading && transactions.length === 0"
      class="text-center text-gray-500"
    >
      No transactions found.
    </div>

    <!-- Transaction List -->
    <ul v-if="!loading && transactions.length > 0" class="space-y-6">
      <li
        v-for="transaction in transactions"
        :key="transaction._id"
        class="transaction-item p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
      >
        <div class="flex justify-between items-center">
          <!-- Left Section -->
          <div class="flex items-center space-x-4">
            <div>
              <h3 class="font-semibold text-lg text-gray-900">
                {{ transaction.description }}
              </h3>
              <p class="text-sm text-gray-600">
                {{ formatDate(transaction.createdAt) }}
              </p>
            </div>
          </div>

          <!-- Right Section (Credits) -->
          <div class="text-right">
            <p
              :class="getTransactionTypeClass(transaction)"
              class="font-medium text-lg"
            >
              {{
                (transaction.action === "creditDeduction" ? "- " : "+ ") +
                transaction.credits
              }}
              Credits
            </p>
          </div>
        </div>

        <!-- Action Type Description -->
        <div class="mt-2">
          <span class="text-sm text-gray-600"
            >Action: {{ formatAction(transaction.action) }}</span
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getTransactions } from "../utils/transactions";

export default {
  data() {
    return {
      transactions: [],
      loading: true,
    };
  },
  methods: {
    // Fetch transactions from backend
    async fetchTransactions() {
      try {
        const response = await getTransactions(); // Replace with your API endpoint
        if (response.transactions) {
          this.transactions = response.transactions || [];
          this.transactions.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        this.loading = false;
      }
    },

    // Format the timestamp
    formatTimestamp(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleString();
    },

    formatDate(isoDateString) {
      const date = new Date(isoDateString);

      // Define options for formatting
      const day = date.getDate();
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const suffixes = ["th", "st", "nd", "rd"];

      // Determine the suffix based on day
      const daySuffix =
        day % 10 < 4 && Math.floor(day / 10) !== 1
          ? suffixes[day % 10]
          : suffixes[0];

      const formattedDate = `${day}${daySuffix} ${
        monthNames[date.getMonth()]
      } ${date.getFullYear()}`;
      const formattedTime = date.toLocaleTimeString("en-GB"); // Format time as hh:mm:ss

      return `${formattedDate}, ${formattedTime}`;
    },

    // Get CSS class based on action type (creditDeduction, etc.)
    getTransactionTypeClass(transaction) {
      if (transaction.action === "creditDeduction") {
        return "text-red-500"; // Deduction is in red
      }
      return "text-green-500"; // Default to green
    },

    // Get Icon class based on action type
    getTransactionIconClass(transaction) {
      return transaction.action === "creditDeduction"
        ? "bg-red-200 text-red-600"
        : "bg-green-200 text-green-600";
    },

    // Format the action (i.e., translate action codes to human-readable text)
    formatAction(action) {
      switch (action) {
        case "creditDeduction":
          return "Credit Deduction";
        case "creditTopUp":
          return "Credit Top Up";
        case "planPurchase":
          return "Plan Purchase";
        default:
          return "Unknown Action";
      }
    },
  },
  mounted() {
    this.fetchTransactions(); // Fetch the transactions when the component mounts
  },
};
</script>

<style scoped>
.transactions-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 10px;
}

.transactions-container h2 {
  font-size: 2rem;
  color: #333;
  font-weight: 700;
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #48bb78;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.transactions-container ul {
  list-style: none;
  padding: 0;
}

.transactions-container li {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
}

.transactions-container li:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.transactions-container li .text-green-500 {
  color: #38a169;
}

.transactions-container li .text-red-500 {
  color: #e53e3e;
}

.transactions-container li .bg-green-200 {
  background-color: #c6f6d5;
}

.transactions-container li .bg-red-200 {
  background-color: #fed7d7;
}

.transactions-container li .font-medium {
  font-weight: 500;
}

.transactions-container li .text-sm {
  font-size: 0.875rem;
}

.transactions-container li .text-lg {
  font-size: 1.125rem;
}

.transactions-container li .text-gray-500 {
  color: #6b7280;
}

.transactions-container li .text-gray-600 {
  color: #4b5563;
}

.transactions-container li .font-semibold {
  font-weight: 600;
}

.transactions-container li .text-gray-900 {
  color: #111827;
}

.transactions-container li .flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.transactions-container li .w-10 {
  width: 2.5rem;
}

.transactions-container li .h-10 {
  height: 2.5rem;
}

.transactions-container li .rounded-full {
  border-radius: 9999px;
}

.transactions-container li .text-right {
  text-align: right;
}

.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
}
</style>
