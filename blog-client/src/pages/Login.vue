<template>
  <div>
    <form v-on:submit.prevent="login">
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import {useAppStore} from "../store/app";

export default {
  setup () {
    const appStore = useAppStore()
    const login = () => {
      appStore.login({
        email: 'leuschke.janet@example.org',
        password: 'password'
      })
    }
    return {
      login
    }
  }
}
</script>