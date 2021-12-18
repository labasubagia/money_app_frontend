<template>
  <div class="w-full h-screen flex justify-center items-start sm:items-center bg-gray-200">
    <slot></slot>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
export default {
  components: { Navigation },
};
</script>
