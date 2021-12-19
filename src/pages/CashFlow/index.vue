<template>
  <MainLayout>
    <div class="flex justify-between items-center pb">
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

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <PencilIcon
            class="w-9 bg-orange-500 p-1 text-white rounded-lg cursor-pointer"
            @click="router.replace({path: `/cashflow/edit/${_id}`})"
          />
          <TrashIcon
            class="w-9 bg-red-500 p-2 text-white rounded-lg cursor-pointer"
            @click="onDelete(_id)"
          />
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import moment from 'moment';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { PencilIcon, TrashIcon } from '@heroicons/vue/outline'
import { getHttpErrorMessage } from '@/helpers/http';
import MainLayout from '@/layouts/MainLayout.vue';
import { deleteCashFlow } from '@/api/cashflow';
import { formatNumber } from '@/helpers/number';

export default {
  components: {
    MainLayout,
    PencilIcon,
    TrashIcon
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
