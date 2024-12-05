<template>
  <div>
    <PlanDetails />
    <!-- <CreditTopup /> -->
  </div>
</template>

<script>
import CreditTopup from "./CreditTopup.vue";
import PlanDetails from "./PlanDetails.vue";

export default {
  components: {
    PlanDetails,
    CreditTopup,
  },
  mounted() {},
};
</script>
