<template>
  <MainLayout>
    <div class="flex justify-between items-center">
      <h1 class="text-xl font-bold">CashFlow</h1>
    </div>
    <form class="mt-4" @submit.prevent="onSubmit">
      <!-- Amount -->
      <div class="mb-4">
        <p class="mb-1 text-sm">Amount</p>
        <input class="border-2 rounded-lg py-1 px-3 w-full" type="number" v-model="form.amount" />
        <p class="text-xs text-red-500 mt-1">{{ formError.amount }}</p>
      </div>

      <!-- Name -->
      <div class="mb-4">
        <p class="mb-1 text-sm">Name</p>
        <input class="border-2 rounded-lg py-1 px-3 w-full" type="text" v-model="form.name" />
        <p class="text-xs text-red-500 mt-1">{{ formError.name }}</p>
      </div>

      <!-- Date -->
      <div class="mb-4">
        <p class="mb-1 text-sm">Date</p>
        <input class="border-2 rounded-lg py-1 px-3 w-full" type="date" v-model="form.date" />
        <p class="text-xs text-red-500 mt-1">{{ formError.date }}</p>
      </div>

      <!-- Category -->
      <div class="mb-4">
        <p class="mb-1 text-sm">Category</p>
        <select class="border-2 bg-white rounded-lg py-2 px-3 w-full" v-model="form.category_id">
          <option value class="text-gray-200">Select Category</option>
          <option
            v-for="(v,i) in categories"
            :key="i"
            :value="v._id"
            :selected="form.category_id == v._id"
          >{{ v.type }} - {{ v.name }}</option>
        </select>
        <p class="text-xs text-red-500 mt-1">{{ formError.category_id }}</p>
      </div>

      <!-- Note -->
      <div class="mb-4">
        <p class="mb-1 text-sm">Note</p>
        <textarea class="w-full py-2 px-3 border-2 rounded-lg" rows="2" v-model="form.note">{{ form.note.value }}</textarea>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <router-link
          to="/cashflow"
          class="py-2 px-3 border-2 border-red-400 text-red-400 rounded-lg w-full text-center"
        >Cancel</router-link>

        <button
          :class="[
            'py-2 px-3 bg-blue-500 text-white rounded-lg w-full transition ease-in duration-150',
            isLoading ? 'bg-blue-300' : ''
          ]"
          :disabled="isLoading"
        >Save</button>
      </div>
    </form>
  </MainLayout>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { createCashFlow, updateCashFlow } from '@/api/cashflow';
import { getHttpErrorMessage, getHttpValidationError } from '@/helpers/http';
import MainLayout from '@/layouts/MainLayout.vue';
import moment from 'moment';

export default {
  components: {
    MainLayout,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const id = ref(route.params?.id);
    const isLoading = ref(false);
    const form = ref({
      name: '',
      category_id: '',
      note: '',
      date: new Date().toISOString().slice(0, 10),
      amount: '',
    });
    const formError = ref({
      name: '',
      category_id: '',
      note: '',
      date: '',
      amount: '',
    });

    const categories = computed(() => store.state.category.list);
    const detail = computed(() => store.state.cashflow.detail);

    watch(detail, (value) => {
      if (!value) return;
      form.value.name = value.name;
      form.value.category_id = value.category_id;
      form.value.note = value.note;
      form.value.date = moment(value.date).toISOString().slice(0, 10);
      form.value.amount = value.amount;
    })

    const loadDetail = async () => {
      store.commit('cashflow/setDetail', null);
      if (!id.value) return;
      await store.dispatch('cashflow/getById', id.value);
    }

    const loadCategory = async () => {
      await store.dispatch('category/getAll');
    }

    const onLoad = async () => {
      isLoading.value = true;
      await Promise.all([
        loadDetail(),
        loadCategory(),
      ])
      isLoading.value = false
    }

    onLoad();

    const onSubmit = async () => {
      try {
        isLoading.value = true;
        const handler = id.value ? updateCashFlow : createCashFlow
        const payload = { ...form.value, id: id.value }
        const { message } = await handler(payload);
        if (message) alert(message);
        router.replace({ path: '/cashflow' })
      } catch (error) {
        const validationError = getHttpValidationError(error);
        if (validationError) {
          formError.value = validationError;
        } else {
          const message = getHttpErrorMessage(error);
          if (message) alert(message);
          console.error(error);
        }
      } finally {
        isLoading.value = false
      }
    }

    return { form, formError, onSubmit, isLoading, categories }
  },
};
</script>
