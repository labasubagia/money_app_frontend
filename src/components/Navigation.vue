<template>
  <!-- Top nav -->
  <div class="w-full block sm:hidden bg-white">
    <!-- Nav -->
    <div
      class="w-full flex sm:hidden justify-between items-center p-2 px-4 border-b-2 border-b-gray-200"
    >
      <h1 class="text-lg font-bold">{{ appName }}</h1>

      <div class="flex">
        <button class="cursor-pointer" @click="isTopNavOpen = !isTopNavOpen">
          <MenuIcon class="w-9" v-if="!isTopNavOpen" />
          <XIcon class="w-9" v-else />
        </button>
      </div>
    </div>

    <!-- menu -->
    <div
      v-if="isTopNavOpen"
      class="border-b-2 border-b-gray-200 shadow-md p-4 border-2 rounded-b-lg"
    >
      <div class="mt-2 mb-3 bg-gray-100 rounded-lg p-5">
        <div v-if="isLoading">
          <p>Loading...</p>
        </div>
        <div v-else>
          <p>{{ user?.name }}</p>
          <p class="mt-2 text-sm">{{ user?.email }}</p>
        </div>
      </div>

      <router-link
        v-for="({ path, name }, index) in urls"
        :key="index"
        :to="path"
        :class="[
          'block px-4 py-2 mb-3 rounded-lg',
          isCurrentPath(path) ? 'bg-gray-200 font-semibold' : 'bg-transparent',
        ]"
      >{{ name }}</router-link>

      <button
        class="flex px-3 py-2 mb-3 rounded-lg bg-red-500 text-white hover:bg-red-400 w-full"
        @click="onLogout"
      >Logout</button>
    </div>
  </div>

  <!-- Side nav -->
  <nav class="hidden sm:block p-4 w-full h-screen border-r-2 border-r-gray-100 shadow-sm bg-white">
    <h1 class="text-center text-xl font-bold">{{ appName }}</h1>

    <div class="mt-4 mb-2 text-center bg-gray-100 p-4 rounded-lg">
      <div v-if="isLoading">
        <p>Loading...</p>
      </div>
      <div v-else>
        <p>{{ user?.name }}</p>
        <p class="mt-2 text-sm">{{ user?.email }}</p>
      </div>
    </div>

    <div class="mt-4">
      <router-link
        v-for="({ path, name }, index) in urls"
        :key="{ index }"
        :class="[
          'block px-4 py-2 mb-3',
          'text-gray-900 rounded-lg',
          isCurrentPath(path) ? 'bg-gray-200 font-semibold' : 'bg-transparent',
        ]"
        :to="path"
      >{{ name }}</router-link>
      <button
        class="mt-2 px-4 py-2 bg-red-500 rounded-lg w-full text-sm text-white hover:bg-red-400"
        @click="onLogout"
      >Logout</button>
    </div>
  </nav>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { MenuIcon, XIcon } from '@heroicons/vue/outline'
import { getToken, logout } from '@/helpers/auth';
import { useRoute, useRouter } from 'vue-router';

export default {
  components: {
    MenuIcon,
    XIcon
  },
  setup() {
    const urls = [
      { name: 'Home', path: '/' },
      { name: 'Cash Flow', path: '/cashflow' },
      { name: 'Category', path: '/category' },
      { name: 'Edit Profile', path: '/edit-profile' },
    ];

    const route = useRoute();
    const router = useRouter();
    const store = useStore()

    const appName = store.state.appName;
    const isTopNavOpen = ref(false);
    const isLoading = ref(false);

    const isCurrentPath = (path) => route.path === path;
    const user = computed(() => store.state.user.detail);

    const onLogout = () => {
      logout();
      if (getToken()) return;
      router.replace({ name: 'Login' })
    }

    const onLoad = async () => {
      if (user.value) return;
      isLoading.value = true;
      await store.dispatch('user/getProfile');
      isLoading.value = false;
    }

    onLoad();

    return {
      isTopNavOpen,
      appName,
      urls,
      isCurrentPath,
      onLogout,
      user,
      isLoading,
    };
  },
};
</script>
