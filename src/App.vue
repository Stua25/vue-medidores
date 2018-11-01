<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Inicio</router-link> 
      <span v-show="islogged" @click="logOut"><b>| Salir</b></span>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data(){
    return{
      islogged: false,
    }
  }, 

  methods:{
    logOut(){
      this.$session.destroy()
      this.$router.push('/')
      this.islogged = false;
    }
  },

  created() {   
    this.islogged = this.$session.exists();
  },

  

}
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }



}
</style>
