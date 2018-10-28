<template>
  <div class="about">
    <h1>This is an about page</h1>  
    <h2>Esto es un segundo texto</h2>
    <h2>{{obj.Nombre}}</h2>
    <h2>{{objArray[1].Nombre}}</h2>

    <button class="button is-primary" @click="changeValue">Cambiar Edad</button>
    <b-table :data="users">
      <template slote-scope="props">
        <b-table-column label="#">
          {{props.index}}
        </b-table-column>
        <b-table-column label="Nombre">
          {{props.row.NOMBRE}}
        </b-table-column>
      </template>
    </b-table>

  </div>
</template>

<script>
export default {
  data(){
    return{
      users: [],
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
            this.users = response.data;   
        });
    }, 
    changeValue(){
      this.users[0].Edad += 50
    }
    
  }, 

  created(){
    this.getUsers();
  }
  
}
</script>

<style>

</style>
