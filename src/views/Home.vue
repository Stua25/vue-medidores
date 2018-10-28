<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/umg.png">
    <HelloWorld msg="Bienvenidos a Medidores Web"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">
  body, html{
    height: 100%;
    width: 100%;
    margin: 0;
  }

 #app {
    background-image: url('../assets/lake.jpg');

    height: 100%; 
    width: 100%;

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  img{
    width: 10%;
    height: 10%;
  }
</style>

