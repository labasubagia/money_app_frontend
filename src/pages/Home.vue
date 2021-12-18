<template>
  <MainLayout>
    <h1>Home</h1>
    <div></div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue';
import { useStore } from 'vuex';

export default {
  components: {
    MainLayout,
  },
  setup() {
    const store = useStore()
  },
};
</script>
