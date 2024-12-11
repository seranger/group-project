<template>
  <nav>
  <router-link to="/WelcomeView">Welcome</router-link>
  <router-link to ="/eloginview">Employee</router-link>
  <router-link to ="/aloginview">Administrator</router-link>
  
  
</nav> 
  <router-view/>
  <WelcomeView/>
</template>

<script>
import WelcomeView from './views/WelcomeView.vue';
export default {
  name: 'app',
  components:{
    WelcomeView,
    
  }
}
</script>
