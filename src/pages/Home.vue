<template>
  <MainLayout>
    <h1 class="text-xl font-bold">Home</h1>
    <div class="grid gap-4 mt-6 grid-cols-1 md:grid-cols-2 w-full">
      <!-- Expense -->
      <div class="p-4 bg-red-500 rounded-lg">
        <h1 class="text-2xl text-white">- {{ formatNumber(summary?.expense_date_range) }}</h1>
        <p class="text-white">Expense This Month</p>
      </div>

      <!-- Income -->
      <div class="p-4 bg-green-500 rounded-lg">
        <h1 class="text-2xl text-white">+ {{ formatNumber(summary?.income_date_range) }}</h1>
        <p class="text-white">Expense This Month</p>
      </div>

      <!-- Balance This Month -->
      <div
        :class="[
          'p-4 rounded-lg',
          summary?.balance_date_range >= 0 ? 'bg-green-500' : 'bg-red-500'
        ]"
      >
        <h1 class="text-2xl text-white">{{ formatNumber(summary?.balance_date_range) }}</h1>
        <p class="text-white">Balance This Month</p>
      </div>

      <!-- Balance This Month -->
      <div
        :class="[
          'p-4 rounded-lg',
          summary?.balance >= 0 ? 'bg-green-500' : 'bg-red-500'
        ]"
      >
        <h1 class="text-2xl text-white">{{ formatNumber(summary?.balance) }}</h1>
        <p class="text-white">All Time Balance</p>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import { formatNumber } from '@/helpers/number';
import MainLayout from '@/layouts/MainLayout.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

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
