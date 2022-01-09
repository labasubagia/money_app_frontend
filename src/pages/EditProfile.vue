<template>
  <MainLayout>
    <div class="flex justify-between items-center">
      <h1 class="text-xl font-bold">Edit Profile</h1>
    </div>

    <Loading v-if="isLoading" class="mt-4" />
    <form v-else class="mt-4" @submit.prevent="onSubmit">
      <!-- Email -->
      <div class="mb-4">
        <p class="mb-1 text-sm">Email</p>
        <input class="border-2 rounded-lg py-1 px-3 w-full" type="text" v-model="form.email" />
        <p class="text-xs text-red-500 mt-1">{{ formError.name }}</p>
      </div>

      <!-- Name -->
      <div class="mb-4">
        <p class="mb-1 text-sm">Name</p>
        <input class="border-2 rounded-lg py-1 px-3 w-full" type="text" v-model="form.name" />
        <p class="text-xs text-red-500 mt-1">{{ formError.name }}</p>
      </div>

      <!-- Password -->
      <div class="mb-4">
        <p class="mb-1 text-sm">Password</p>
        <input class="border-2 rounded-lg py-1 px-3 w-full" type="password" v-model="form.password" />
        <p class="text-xs text-red-500 mt-1">{{ formError.password }}</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          type="button"
          @click="router.back()"
          class="py-2 px-3 border-2 border-red-400 text-red-400 rounded-lg w-full text-center"
        >Cancel</button>

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
import { updateUser } from '@/api/user';
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

    const isLoading = ref(false);
    const form = ref({
      name: '',
      email: '',
      password: null,
    });
    const formError = ref({
      name: '',
      email: '',
      password: '',
    });

    const detail = computed(() => store.state.user.detail);

    watch(detail, (value) => {
      if (!value) return;
      form.value.name = value.name;
      form.value.email = value.email;
    })

    const onLoad = async () => {
      store.commit('user/setDetail', null);
      isLoading.value = true
      await store.dispatch('user/getProfile');
      isLoading.value = false
    }

    onLoad();

    const onSubmit = async () => {
      try {
        isLoading.value = true;
        const payload = { ...form.value };
        if (!payload?.password) delete payload?.password;
        const { message } = await updateUser(payload)
        if (message) alert(message);
        router.back()
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

    return {
      form,
      formError,
      onSubmit,
      isLoading,
      router
    };
  },
};
</script>
