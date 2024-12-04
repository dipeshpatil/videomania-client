<template>
  <div class="transactions-container mb-12 mx-auto p-4">
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
    <ul v-if="!loading && transactions.length > 0" class="space-y-3">
      <li
        v-for="transaction in transactions"
        :key="transaction._id"
        :class="[
          'transaction-item p-6 rounded-lg border-2 border-dashed',
          transaction.action === 'creditDeduction'
            ? 'bg-red-50 border-red-400'
            : 'bg-green-50 border-green-400',
        ]"
      >
        <div class="flex justify-between items-center">
          <!-- Left Section -->
          <div class="flex items-center space-x-4">
            <div>
              <h3 class="font-semibold text-lg text-gray-900">
                {{ formatAction(transaction.description) }}
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

  <Pagination
    :total-items="totalItems"
    :items-per-page="itemsPerPage"
    @page-changed="handlePageChange"
  />
</template>

<script>
import Pagination from "./Pagination.vue";
import { formatAction, formatDate, formatTimestamp } from "../utils/common";
import { getTransactions } from "../utils/transactions";

export default {
  data() {
    return {
      transactions: [],
      loading: true,
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0,
    };
  },
  components: {
    Pagination,
  },
  methods: {
    formatAction,
    formatDate,
    formatTimestamp,
    handlePageChange(newPage) {
      this.currentPage = newPage;
      this.fetchTransactions();
    },
    async fetchTransactions() {
      try {
        console.log(this.itemsPerPage, this.currentPage);
        const transactionsResult = await getTransactions({
          limit: this.itemsPerPage,
          pageNumber: this.currentPage,
        });
        const { transactions, itemCount } = transactionsResult;
        if (transactions) {
          this.transactions = transactions || [];
          this.totalItems = itemCount;
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
    getTransactionTypeClass(transaction) {
      if (transaction.action === "creditDeduction") {
        return "text-red-500"; // Deduction is in red
      }
      return "text-green-500"; // Default to green
    },
    getTransactionIconClass(transaction) {
      return transaction.action === "creditDeduction"
        ? "bg-red-200 text-red-600"
        : "bg-green-200 text-green-600";
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
  border-radius: 10px;
}
.transactions-container li .flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
}
</style>
