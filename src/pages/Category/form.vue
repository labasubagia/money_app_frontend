<template>
  <MainLayout>
    <div class="flex justify-between items-center">
      <h1 class="text-xl font-bold">Category</h1>
    </div>

    <Loading v-if="isLoading" class="mt-4" />
    <form v-else class="mt-4" @submit.prevent="onSubmit">
      <!-- Name -->
      <div class="mb-4">
        <p class="mb-1 text-sm">Name</p>
        <input class="border-2 rounded-lg py-1 px-3 w-full" type="text" v-model="form.name" />
        <p class="text-xs text-red-500 mt-1">{{ formError.name }}</p>
      </div>

      <!-- Type -->
      <div class="mb-4">
        <p class="mb-1 text-sm">Type</p>
        <select class="border-2 bg-white rounded-lg py-2 px-3 w-full" v-model="form.type">
          <option value class="text-gray-200">Select Type</option>
          <option
            v-for="(v,i) in types"
            :key="i"
            :value="v.value"
            :selected="form.type == v.value"
          >{{ v.label }}</option>
        </select>
        <p class="text-xs text-red-500 mt-1">{{ formError.type }}</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <router-link
          to="/category"
          class="py-2 px-3 border-2 border-red-400 text-red-400 rounded-lg w-full text-center"
        >Cancel</router-link>

        <button
          :class="[
            'py-2 px-3 bg-blue-500 text-white rounded-lg w-full transition ease-in duration-150',
            isLoading || isSubmitting ? 'bg-blue-300' : ''
          ]"
          :disabled="isLoading || isSubmitting"
        >Save</button>
      </div>
    </form>
  </MainLayout>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { createCategory, updateCategory } from '@/api/category';
import { getHttpErrorMessage, getHttpValidationError } from '@/helpers/http';
import MainLayout from '@/layouts/MainLayout.vue';
import Loading from '@/components/Loading.vue';

export default {
  components: {
    MainLayout,
    Loading,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const types = [
      { label: 'Expense', value: 'EXPENSE' },
      { label: 'Income', value: 'INCOME' },
    ];

    const id = ref(route.params?.id);
    const isLoading = ref(false);
    const isSubmitting = ref(false);
    const form = ref({
      name: '',
      type: '',
    });
    const formError = ref({
      name: '',
      type: '',
    });

    const detail = computed(() => store.state.category.detail);

    watch(detail, (value) => {
      if (!value) return;
      form.value.name = value.name;
      form.value.type = value.type;
    })

    const onLoad = async () => {
      store.commit('category/setDetail', null);
      if (!id.value) return;
      isLoading.value = true
      await store.dispatch('category/getById', id.value);
      isLoading.value = false
    }

    onLoad();


    const onSubmit = async () => {
      try {
        isSubmitting.value = true;
        const handler = id.value ? updateCategory : createCategory
        const payload = { ...form.value, id: id.value }
        const { message } = await handler(payload);
        if (message) alert(message);
        router.replace({ path: '/category' })
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
        isSubmitting.value = false
      }
    }

    return {
      form,
      formError,
      onSubmit,
      isLoading,
      isSubmitting,
      types
    };
  },
};
</script>
