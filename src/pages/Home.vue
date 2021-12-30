<template>
  <MainLayout>
    <h1 class="text-xl font-bold">Home</h1>
    <div class="flex flex-col sm:flex-row mt-4">
      <div>
        <p class="mb-1 text-sm">Start Date</p>
        <input
          class="border-2 rounded-lg py-1 px-3 w-full"
          type="date"
          :value="startDate"
          @input="e => store.commit('setStartDate', e.target.value)"
        >
      </div>

      <div class="mx-0 mt-2 sm:mx-4 sm:mt-0">
        <p class="mb-1 text-sm">End Date</p>
        <input
          class="border-2 rounded-lg py-1 px-3 w-full"
          type="date"
          :value="endDate"
          @input="e => store.commit('setEndDate', e.target.value)"
        >
      </div>
    </div>

    <div class="grid gap-4 mt-6 grid-cols-1 md:grid-cols-2 w-full">
      <!-- Expense -->
      <div class="p-4 border-l-8 border-l-red-500 rounded-lg shadow-md border-2">
        <h1 class="text-2xl">- {{ formatNumber(summary?.expense_date_range) }}</h1>
        <p>Expense</p>
      </div>

      <!-- Income -->
      <div class="p-4 border-l-8 border-l-green-500 rounded-lg shadow-md border-2">
        <h1 class="text-2xl">+ {{ formatNumber(summary?.income_date_range) }}</h1>
        <p>Income</p>
      </div>

      <!-- Balance This Month -->
      <div
        :class="[
          'p-4 rounded-lg border-l-8 shadow-md border-2',
          summary?.balance_date_range >= 0 ? 'border-l-green-500' : 'border-l-red-500'
        ]"
      >
        <h1 class="text-2xl">{{ formatNumber(summary?.balance_date_range) }}</h1>
        <p>Balance</p>
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
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { formatNumber } from '@/helpers/number';
import MainLayout from '@/layouts/MainLayout.vue';

export default {
  components: {
    MainLayout,
  },
  setup() {
    const store = useStore();

    const summary = computed(() => store.state.cashflow.summary);

    const startDate = computed(() => store.state.startDate);
    const endDate = computed(() => store.state.endDate);

    const loadSummary = () => {
      store.dispatch('cashflow/getSummary');
    }

    loadSummary();

    watch([startDate, endDate], loadSummary)

    return { summary, formatNumber, store, startDate, endDate }
  },
};
</script>
