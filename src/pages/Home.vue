<template>
  <MainLayout>
    <h1 class="text-xl font-bold">Home</h1>
    <div class="grid gap-4 mt-6 grid-cols-1 md:grid-cols-2 w-full">
      <!-- Expense -->
      <div class="p-4 border-l-8 border-l-red-500 rounded-lg shadow-md border-2">
        <h1 class="text-2xl">- {{ formatNumber(summary?.expense_date_range) }}</h1>
        <p>Expense This Month</p>
      </div>

      <!-- Income -->
      <div class="p-4 border-l-8 border-l-green-500 rounded-lg shadow-md border-2">
        <h1 class="text-2xl">+ {{ formatNumber(summary?.income_date_range) }}</h1>
        <p>Expense This Month</p>
      </div>

      <!-- Balance This Month -->
      <div
        :class="[
          'p-4 rounded-lg border-l-8 shadow-md border-2',
          summary?.balance_date_range >= 0 ? 'border-l-green-500' : 'border-l-red-500'
        ]"
      >
        <h1 class="text-2xl">{{ formatNumber(summary?.balance_date_range) }}</h1>
        <p>Balance This Month</p>
      </div>

      <!-- Balance This Month -->
      <div
        :class="[
          'p-4 rounded-lg border-l-8 shadow-md border-2',
          summary?.balance >= 0 ? 'border-l-green-500' : 'border-l-red-500'
        ]"
      >
        <h1 class="text-2xl">{{ formatNumber(summary?.balance) }}</h1>
        <p>All Time Balance</p>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { formatNumber } from '@/helpers/number';
import MainLayout from '@/layouts/MainLayout.vue';

export default {
  components: {
    MainLayout,
  },
  setup() {
    const store = useStore();

    store.dispatch('cashflow/getSummary');

    const summary = computed(() => store.state.cashflow.summary);

    return { summary, formatNumber }
  },
};
</script>
