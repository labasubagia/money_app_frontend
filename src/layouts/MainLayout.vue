<template>
  <div class="flex flex-col w-full h-screen sm:flex-row">
    <div class="w-12/12 sm:w-4/12 md:w-3/12 lg:w-2/12">
      <Navigation/>
    </div>
    <div class="p-4 mr-2">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
export default {
  components: { Navigation },
};
</script>
