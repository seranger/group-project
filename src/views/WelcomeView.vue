<template>
  <div class="Welcome">
    <nav>
  <router-link to="/">Home</router-link>
</nav> 
    <login-comp/>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginComp from '@/components/LoginComp.vue'

export default {
  name: 'WelcomView',
  components: {
    LoginComp
  }
}
</script>
