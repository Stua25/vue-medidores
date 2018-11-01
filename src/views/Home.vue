<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/umg.png">
    <LogIn msg="Bienvenidos a Medidores Web"/>
  </div>
</template>

<script>
// @ is an alias to /src
import LogIn from '@/components/LogIn.vue'

export default {
  name: 'home',
  components: {
    LogIn
  }
}
</script>

<style lang="scss">
  body, html{
    height: 100%;
    width: 100%;
    margin: 0;
    
    background-image: url('../assets/lake.jpg');
    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }


   body{
   }


  img{
    width: 10%;
    height: 10%;
  }
</style>

