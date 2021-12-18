<template>
  <h1>{{ msg }}</h1>
  <button type="button" @click="increment">count is: {{ count }}</button>
</template>


<script>
import { ref } from 'vue';

export default {
  props: {
    msg: String,
  },
  setup() {
    const count = ref(0);

    const increment = () => count.value++;

    return {
      count,
      increment,
    };
  },
};
</script>


<style scoped>
a {
  color: #42b983;
}
</style>
