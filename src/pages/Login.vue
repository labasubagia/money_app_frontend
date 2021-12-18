<template>
  <AuthLayout>
    <form
      @submit.prevent="onSubmit"
      class="bg-white p-8 rounded-lg w-full sm:w-auto h-screen sm:h-auto"
    >
      <h1 class="text-xl text-center border-b-2 border-b-gray-200 pb-4">Login</h1>

      <div class="mt-4">
        <div class="mb-4">
          <p class="mb-1 text-sm">Email</p>
          <input class="border-2 rounded-lg py-1 px-3 w-full" type="text" v-model="form.email" />
        </div>
        <div class="mb-4">
          <p class="mb-1 text-sm">Password</p>
          <input
            class="border-2 rounded-lg py-1 px-3 w-full"
            type="password"
            v-model="form.password"
          />
        </div>
      </div>

      <p class="text-xs text-center mb-4">
        Don't have account?
        <router-link class="text-blue-300" to="/register">Register</router-link>
      </p>

      <button class="py-2 px-3 bg-blue-500 text-white rounded-lg w-full">Login</button>
    </form>
  </AuthLayout>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/api/auth";
import AuthLayout from "@/layouts/AuthLayout.vue";

export default {
  components: {
    AuthLayout,
  },
  setup() {
    const router = useRouter();

    const form = ref({
      email: '',
      password: '',
    })

    const onSubmit = async () => {
      try {
        await login(form.value)
        router.replace({ path: '/' })
      } catch (error) {
        console.error(error);
      }
    }

    return { form, onSubmit };
  }
}
</script>
