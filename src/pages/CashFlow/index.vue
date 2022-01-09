<template>
  <MainLayout>
    <div class="flex justify-between items-center pb">
      <h1 class="text-xl font-bold">CashFlow</h1>
      <router-link to="/cashflow/add" class="bg-blue-500 p-2 px-3 text-white rounded-lg">Add</router-link>
    </div>

    <div class="flex flex-col sm:flex-row mt-4 items-center">
      <div>
        <p class="mb-1 text-sm">Start Date</p>
        <input
          class="border-2 rounded-lg py-1 px-3 w-full"
          type="date"
          :value="startDate"
          @input="e => store.commit('setStartDate', e.target.value)"
        />
      </div>

      <div class="mx-0 mt-2 sm:ml-4 sm:mt-0">
        <p class="mb-1 text-sm">End Date</p>
        <input
          class="border-2 rounded-lg py-1 px-3 w-full"
          type="date"
          :value="endDate"
          @input="e => store.commit('setEndDate', e.target.value)"
        />
      </div>

      <div class="mx-0 mt-2 sm:ml-4 sm:mt-0">
        <p class="mb-1 text-sm">Category</p>
        <select
          class="border-2 bg-white rounded-lg py-2 px-2 w-full"
          @input="e => store.commit('setCategoryId', e.target.value)"
        >
          <option value>All Category</option>
          <option
            v-for="(v,i) in categories"
            :key="i"
            :value="v._id"
            :selected="categoryId == v._id"
          >{{ v.type }} - {{ v.name }}</option>
        </select>
      </div>
    </div>

    <Loading v-if="isLoading" class="mt-8" />
    <div v-else class="mt-8">
      <Empty v-if="!cashFlows.length" text="No Cashflow" />
      <div v-else>
        <p class="text-xl mb-4">Total Amount : {{ formatNumber(totalAmount) }}</p>
        <div
          v-for="({ _id, name, date, amount_value, category_name, category_type }, i) in cashFlows"
          :key="i"
          :class="[
            'p-4 shadow-md mb-4 border-2 rounded-lg flex justify-between items-center border-l-8',
            amount_value > 0 ? 'border-l-green-500' : 'border-l-red-500'
          ]"
        >
          <div>
            <p class="text-xl">{{ formatNumber(amount_value) }}</p>
            <p class="mt-1">{{ name }}</p>
            <p class="text-sm mt-1 whitespace-nowrap">{{ category_type }} - {{ category_name }}</p>
            <p class="text-sm mt-1">{{ moment(date).format('DD/MM/YYYY') }}</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <PencilIcon
              class="w-9 bg-orange-500 p-1 text-white rounded-lg cursor-pointer"
              @click="router.replace({ path: `/cashflow/edit/${_id}` })"
            />
            <TrashIcon
              class="w-9 bg-red-500 p-2 text-white rounded-lg cursor-pointer"
              @click="onDelete(_id)"
            />
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import moment from 'moment';
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { PencilIcon, TrashIcon } from '@heroicons/vue/outline'
import { getHttpErrorMessage } from '@/helpers/http';
import MainLayout from '@/layouts/MainLayout.vue';
import { deleteCashFlow } from '@/api/cashflow';
import { formatNumber } from '@/helpers/number';
import { useRouter } from 'vue-router';
import Loading from '@/components/Loading.vue';
import Empty from '@/components/Empty.vue';

export default {
  components: {
    MainLayout,
    PencilIcon,
    TrashIcon,
    Loading,
    Empty,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const cashFlows = computed(() => store.state.cashflow.list);
    const totalAmount = computed(() => store.getters['cashflow/totalListAmount']);
    const categories = computed(() => store.state.category.list);
    const errorMessage = ref(null)
    const isLoading = ref(false);

    const loadCashflow = async () => {
      isLoading.value = true;
      await store.dispatch('cashflow/getAll');
      isLoading.value = false;
    }

    const loadCategories = async () => {
      isLoading.value = true
      await store.dispatch('category/getAll');
      isLoading.value = false;
    }

    const initPage = () => {
      store.commit('setCategoryId', undefined)
      loadCashflow();
      loadCategories();
    }

    const startDate = computed(() => store.state.startDate);
    const endDate = computed(() => store.state.endDate);
    const categoryId = computed(() => store.state.categoryId);

    initPage();

    watch([startDate, endDate, categoryId], loadCashflow)

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

    return {
      cashFlows,
      categories,
      onDelete,
      moment,
      formatNumber,
      router,
      startDate,
      endDate,
      categoryId,
      store,
      isLoading,
      totalAmount,
    };
  },
};
</script>
