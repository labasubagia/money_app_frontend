<template>
  <div class="flex justify-center items-center py-8">
    <h1 class="text-xl text-gray-300">{{ text }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    }
  }
}
</script>
