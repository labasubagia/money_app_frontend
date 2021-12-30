<template>
  <MainLayout>
    <div class="flex justify-between items-center">
      <h1 class="text-xl font-bold">Category</h1>
      <router-link to="/category/add" class="bg-blue-500 p-2 px-3 text-white rounded-lg">Add</router-link>
    </div>

    <Loading v-if="isLoading" class="mt-4"/>
    <div v-else class="mt-4">
      <div
        v-for="({ _id, name, type, user_id }, i) in categories"
        :key="i"
        :class="[
          'p-4 shadow-md mb-4 border-2 rounded-lg flex justify-between items-center border-l-8',
          type == 'INCOME' ? 'border-l-green-500' : 'border-l-red-500'
        ]"
      >
        <div>
          <p>{{ name }}</p>
          <p class="mt-1">{{ type }}</p>
        </div>

        <div v-if="user_id" class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <PencilIcon
            class="w-9 bg-orange-500 p-1 text-white rounded-lg cursor-pointer"
            @click="router.replace({path: `/category/edit/${_id}`})"
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
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { PencilIcon, TrashIcon } from '@heroicons/vue/outline'
import { deleteCategory } from '@/api/category';
import { getHttpErrorMessage } from '@/helpers/http';
import MainLayout from '@/layouts/MainLayout.vue';
import Loading from '@/components/Loading.vue';

export default {
  components: {
    MainLayout,
    PencilIcon,
    TrashIcon,
    Loading,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const categories = computed(() => store.state.category.list);
    const errorMessage = ref(null)
    const isLoading = ref(true);

    const loadCategories = async () => {
      isLoading.value = true;
      await store.dispatch('category/getAll');
      isLoading.value = false;
    }

    loadCategories();

    const onDelete = async (id) => {
      try {
        const isConfirm = confirm('Delete category?');
        if (!isConfirm) return;
        const { message } = await deleteCategory(id);
        if (message) alert(message)
        store.dispatch('category/getAll')
      } catch (error) {
        errorMessage.value = getHttpErrorMessage(error);
        if (errorMessage.value) alert(errorMessage.value);
        console.error(error);
      }
    }

    return {
      categories,
      onDelete,
      router,
      isLoading,
    };
  },
};
</script>
