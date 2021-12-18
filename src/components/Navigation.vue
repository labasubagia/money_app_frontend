<template>
  <!-- Top nav -->
  <div class="w-full block sm:hidden">
    <!-- Nav -->
    <div
      class="w-full flex sm:hidden justify-between items-center p-2 px-4 border-b-2 border-b-gray-200"
    >
      <h1>{{ appName }}</h1>
      <div class="flex">
        <button class="cursor-pointer mr-4" @click="isTopNavOpen = !isTopNavOpen">Menu</button>
      </div>
    </div>

    <!-- menu -->
    <div v-if="isTopNavOpen" class="border-b-2 border-b-gray-200 mt-4 mx-4">
      <router-link
        v-for="({ path, name }, index) in urls"
        :key="index"
        :to="path"
        :class="[
          'block px-4 py-2 mb-3 text-sm rounded-lg',
          isCurrentPath(path) ? 'bg-gray-200 font-semibold' : 'bg-transparent',
        ]"
      >{{ name }}</router-link>

      <button
        class="flex px-3 py-2 mb-3 text-sm rounded-lg bg-red-500 text-white hover:bg-red-400 w-full"
        @click="onLogout"
      >Logout</button>
    </div>
  </div>

  <!-- Side nav -->
  <nav class="hidden sm:block p-4 w-full h-screen border-r-2 border-r-gray-100 shadow-sm">
    <h1 class="text-center text-xl font-bold">{{ appName }}</h1>
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
        class="px-4 py-2 bg-red-500 rounded-lg w-full text-sm text-white hover:bg-red-400"
        @click="onLogout"
      >Logout</button>
    </div>
  </nav>
</template>

<script>
import { getToken, logout } from '@/helpers/auth';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup() {
    const urls = [
      { name: 'Home', path: '/' },
      { name: 'Category', path: '/category' },
      { name: 'Cash Flow', path: '/cashflow' },
      { name: 'Edit Profile', path: '/edit-profile' },
    ];

    const route = useRoute();
    const router = useRouter();
    const store = useStore()

    const appName = store.state.appName;
    const isTopNavOpen = ref(false);

    const isCurrentPath = (path) => route.path === path;

    const onLogout = () => {
      logout();
      if (getToken()) return;
      router.replace({ name: 'Login' })
    }

    return { isTopNavOpen, appName, urls, isCurrentPath, onLogout };
  },
};
</script>
