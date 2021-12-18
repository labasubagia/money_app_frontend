<template>
  <AuthLayout>
    <form @submit.prevent="onsubmit" class="bg-white p-8 rounded-lg">
      <h1 class="text-xl text-center border-b-2 border-b-gray-200 pb-4">Register</h1>

      <div class="mt-4">
        <div class="mb-4">
          <p class="mb-1 text-sm">Email</p>
          <input class="border-2 rounded-lg py-1 px-3" type="text" v-model="form.email" />
        </div>

        <div class="mb-4">
          <p class="mb-1 text-sm">Full Name</p>
          <input class="border-2 rounded-lg py-1 px-3" type="text" v-model="form.name" />
        </div>

        <div class="mb-4">
          <p class="mb-1 text-sm">Password</p>
          <input class="border-2 rounded-lg py-1 px-3" type="password" v-model="form.password" />
        </div>
      </div>

      <p class="text-xs text-center mb-4">
        Already have account?
        <router-link class="text-blue-300" to="/login">Login</router-link>
      </p>

      <button class="py-2 px-3 bg-blue-500 text-white rounded-lg w-full">Register</button>
    </form>
  </AuthLayout>
</template>

<script>
import AuthLayout from "@/layouts/AuthLayout.vue";
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    AuthLayout,
  },
  setup() {
    const store = useStore();

    const form = ref({
      email: '',
      name: '',
      password: '',
    })

    const onsubmit = async () => {
      const data = await store.dispatch('auth/register', form.value);
      console.log({ data });
    }

    return { form, onsubmit };
  }
}
</script>
