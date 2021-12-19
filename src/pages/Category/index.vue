<template>
  <MainLayout>
    <div class="flex justify-between items-center">
      <h1 class="text-xl font-bold">Category</h1>
      <router-link to="/category/add" class="bg-blue-500 p-2 px-3 text-white rounded-lg">Add</router-link>
    </div>
    <div class="mt-4">
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

        <div v-if="user_id">
          <router-link
            type="button"
            class="bg-orange-400 mr-2 p-1 px-2 rounded-lg text-sm text-white"
            :to="`/category/edit/${_id}`"
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
import { deleteCategory } from '@/api/category';
import { getHttpErrorMessage } from '@/helpers/http';
import MainLayout from '@/layouts/MainLayout.vue';

export default {
  components: {
    MainLayout,
  },
  setup() {
    const store = useStore();

    store.dispatch('category/getAll');

    const categories = computed(() => store.state.category.list);
    const errorMessage = ref(null)

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

    return { categories, onDelete }
  },
};
</script>
