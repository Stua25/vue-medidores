<template>
  <div class="about">
    <h1>This is an about page</h1>  
    <h2>Esto es un segundo texto</h2>
    <h2>{{obj.Nombre}}</h2>
    <h2>{{objArray[1].Nombre}}</h2>
    <h2>{{users[0].Edad}}</h2>

  <!-- <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">Nombre</th>
          <th scope="col">Edad</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value,key) in users" v-bind:key="key">
          <td>{{key}}</td>
          <td>{{value.Nombre}}</td>
          <td>{{value.Edad}}</td>
        </tr>
      </tbody>

    </table>

  </div> -->


  </div>
</template>

<script>
export default {
  data(){
    return{
      users: [
        {Edad: 0,Nombre: ''}
      ],
      obj: {
        Nombre: "Esto es un Nombre dentro de Un objeto"
      }, 
      objArray: [
        {
          Nombre: "Primer Nombre dentro de Array"
        },
        {
          Nombre: "Segundo Nombre dentro de Array"
        }
      ]
    }
  }, 

  methods: {
    getUsers(){
      let uri = 'http://localhost:4000/user';
          this.axios.get(uri).then((response) => {
            var data = JSON.stringify(response.data);
            var converted = JSON.parse(data);
            this.users = converted;

              
              
        });
    }
    
  }, 

  created(){
    this.getUsers();

  }
  
}
</script>

<style>

</style>
