<template>
  <!-- Top nav -->
  <div class="w-full block sm:hidden ">

    <!-- Nav -->
    <div class="w-full flex sm:hidden justify-between p-2 px-4 border-b-2 border-b-gray-200">
      <h1>{{appName}}</h1>
      <button class="cursor-pointer" @click="isTopNavOpen=!isTopNavOpen">Menu</button>
    </div>

    <!-- menu -->
    <div v-if="isTopNavOpen" class="border-b-2 border-b-gray-200 mt-4">
      <router-link
        v-for="({ path, name }, index) in urls"
        :key="index"
        :to="path"
        :class="[
          'block px-4 py-2 mb-3 text-sm mx-4 rounded-lg',
          isCurrentPath(path) ? 'bg-gray-200 font-semibold' : 'bg-transparent',
        ]"
      >
        {{name}}
      </router-link>
    </div>

  </div>

  <!-- Side nav -->
  <nav class="hidden sm:block p-4 w-full h-screen border-r-2 border-r-gray-100 shadow-sm">
    <h1>{{appName}}</h1>
    <div class="mt-4">
      <router-link
        v-for="({ path, name }, index) in urls"
        :key="{ index }"
        :class="[
          'block px-4 py-2 mb-3',
          'text-sm text-gray-900 rounded-lg',
          isCurrentPath(path) ? 'bg-gray-200 font-semibold' : 'bg-transparent',
        ]"
        :to="path"
      >
        {{ name }}
      </router-link>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();

    const isTopNavOpen = ref(false);
    const appName = ref('Money App')
    const urls = ref([
      { name: 'Home', path: '/' },
      { name: 'Category', path: '/category' },
      { name: 'Cash Flow', path: '/cashflow' },
      { name: 'Edit Profile', path: '/edit-profile' },
    ]);

    const isCurrentPath = (path) => route.path === path;

    return { isTopNavOpen, appName, urls, isCurrentPath };
  },
};
</script>
