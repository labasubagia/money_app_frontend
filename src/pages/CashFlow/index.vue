<template>
  <MainLayout>
    <div class="flex justify-between items-center">
      <h1 class="text-xl font-bold">CashFlow</h1>
      <router-link to="/cashflow/add" class="bg-blue-500 p-2 px-3 text-white rounded-lg">Add</router-link>
    </div>
    <div class="mt-4">
      <div
        v-for="({ _id, name, date, amount, category_name, category_type }, i) in cashFlows"
        :key="i"
        :class="[
          'p-4 shadow-md mb-4 border-2 rounded-lg flex justify-between items-center border-l-8',
          category_type == 'INCOME' ? 'border-l-green-500' : 'border-l-red-500'
        ]"
      >
        <div>
          <p class="text-2xl">{{ category_type == 'INCOME' ? '+' : '-' }} {{ formatNumber(amount) }}</p>
          <p class="mt-1">{{ name }}</p>
          <p class="mt-1 whitespace-nowrap">{{ category_type }} - {{ category_name }}</p>
          <p class="mt-1">{{ moment(date).format('DD/MM/YYYY') }}</p>
        </div>

        <div>
          <router-link
            type="button"
            class="bg-orange-400 mr-2 p-1 px-2 rounded-lg text-sm text-white"
            :to="`/cashflow/edit/${_id}`"
          >Edit</router-link>
          <button
            type="button"
            class="bg-red-500 p-1 px-2 rounded-lg text-sm text-white"
            @click="onDelete(_id)"
          >Delete</button>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import moment from 'moment';
import { getHttpErrorMessage } from '@/helpers/http';
import MainLayout from '@/layouts/MainLayout.vue';
import { deleteCashFlow } from '@/api/cashflow';
import { formatNumber } from '@/helpers/number';

export default {
  components: {
    MainLayout,
  },
  setup() {
    const store = useStore();


    store.dispatch('cashflow/getAll');

    const cashFlows = computed(() => store.state.cashflow.list);
    const errorMessage = ref(null)

    const onDelete = async (id) => {
      try {
        const isConfirm = confirm('Delete cashflow?');
        if (!isConfirm) return;
        const { message } = await deleteCashFlow(id);
        if (message) alert(message)
        store.dispatch('cashflow/getAll')
      } catch (error) {
        errorMessage.value = getHttpErrorMessage(error);
        if (errorMessage.value) alert(errorMessage.value);
        console.error(error);
      }
    }

    return { cashFlows, onDelete, moment, formatNumber }
  },
};
</script>
