<template>
  <div class="flex flex-col w-full sm:flex-row">
    <div class="sm:h-screen sticky top-0 w-12/12 sm:w-4/12 md:w-3/12">
      <div class="w-full">
        <Navigation />
      </div>
    </div>
    <div class="p-4 sm:p-8 w-full">
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
