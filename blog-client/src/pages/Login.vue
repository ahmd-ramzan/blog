<template>
  <div class="max-w-md mx-auto w-full">
    <form v-on:submit.prevent="attemptLogin" class="mt-8 space-y-6">
      <div class="rounded-md shadow-sm space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <div class="mt-1">
            <input v-model="form.email" type="text" name="email" id="email" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="you@example.com">
            <p v-if="appStore.loginErrors.email" class="mt-2 text-sm text-red-600">
              {{ appStore.loginErrors.email[0] }}
            </p>
            <p v-if="appStore.invalidCredentialsError" class="mt-2 text-sm text-red-600">
              {{ appStore.invalidCredentialsError }}
            </p>
          </div>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <div class="mt-1">
            <input v-model="form.password" type="password" name="password" id="password" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
            <p v-if="appStore.loginErrors.password" class="mt-2 text-sm text-red-600">
              {{ appStore.loginErrors.password[0] }}
            </p>
          </div>
        </div>
      </div>

      <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Sign in
      </button>
    </form>
  </div>
</template>

<script>
import {useAppStore} from "../store/app";
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const appStore = useAppStore()
    const router = useRouter()

    const form = reactive({
      email: '',
      password: ''
    })
    const attemptLogin = async () => {
      const loginResponse = await appStore.login(form)
      if (loginResponse === 1) router.replace({name: 'admin.posts'})
    }
    return {
      attemptLogin,
      form,
      appStore
    }
  }
}
</script>