<template>
  <MainLayout>
    <div class="flex justify-between items-center">
      <h1 class="text-xl font-bold">Cashflow Detail</h1>
    </div>

    <hr class="mt-4" />

    <Loading v-if="isLoading" class="mt-2" />
    <div v-else class="mt-2">
      <div class="grid grid-cols-1 sm:grid-cols-2 items-center">
        <div>
          <p class="font-semibold">Name</p>
          <p class="mt-2">{{ detail?.name }}</p>
        </div>

        <div class="mt-4">
          <p class="font-semibold">Date</p>
          <p class="mt-2">{{ moment(detail?.date).format('DD/MM/YYYY') }}</p>
        </div>

        <div class="mt-4">
          <p class="font-semibold">Amount</p>
          <p
            :class="[
              'text-2xl mt-2',
              detail?.amount_value >= 0 ? 'text-green-500' : 'text-red-500'
            ]"
          >{{ detail?.amount_value }}</p>
        </div>

        <div class="mt-4">
          <p class="font-semibold">Type</p>
          <p class="mt-2">{{ detail?.category_type }}</p>
        </div>

        <div class="mt-4">
          <p class="font-semibold">Category</p>
          <p class="mt-2">{{ detail?.category_name }}</p>
        </div>
      </div>

      <div v-if="detail?.note" class="mt-6 bg-gray-100 p-4 rounded-lg">
        <p class="font-semibold">Note</p>
        <p class="mt-2">{{ detail?.note }}</p>
      </div>

      <div v-if="detail?.receipt_url" class="mt-6">
        <p class="font-semibold">Receipt</p>
        <img
          class="mt-2 w-full sm:w-6/12 md:w-3/12 border-2 rounded"
          :src="detail?.receipt_url"
          alt="Receipt"
        />
      </div>
    </div>
  </MainLayout>
</template>

<script>
import moment from 'moment';
import MainLayout from "@/layouts/MainLayout.vue"
import Loading from "@/components/Loading.vue"
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { ref, computed } from "vue";

export default {
  components: {
    MainLayout,
    Loading,
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const id = ref(route.params?.id);
    const detail = computed(() => store.state.cashflow.detail);
    const isLoading = ref(true);

    const onLoad = async () => {
      store.commit('cashflow/setDetail', null);
      isLoading.value = true
      await store.dispatch('cashflow/getById', id.value);
      isLoading.value = false
    }

    onLoad();

    return {
      detail,
      isLoading,
      moment,
    }
  }
}
</script>
