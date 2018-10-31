<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="container">
        <div class="row">
            <div class="col align-self-center">
              <form @submit.prevent="ingresar"><!-- method="POST" action="http://localhost:4000/logIng"-->
                   <div class="form-group">
                        <label for="exampleInputEmail1">Correo Electrónico</label>
                        <input type="email"  v-model="form.email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingrese su Correo Electrónico" name="email" required>
                        <small id="emailHelp" class="form-text text-muted" style="color: #fff">Ingrese el correo dado por la empresa par acceder.</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Contraseña</label>
                        <input type="password" v-model="form.password" class="form-control" id="exampleInputPassword1" name="password" placeholder="Ingrese su Contraseña" required>
                    </div>
                    <p style="text-align: center">
                        <b-button type="submit" variant="primary">Ingresar</b-button>                       
                    </p>
                  </form> 
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }, 

  data(){
    return{
      form: {
        email: '',
        password: ''
      }
    }
  }, 

  methods: {
    
        ingresar(){
          var scope = this
          this.$http.post('http://localhost:4000/logIng', 
          {
            user: this.form.email, 
            password: this.form.password
            }).then(function(response){
              debugger
              if(response.data.length == 0 || response.data == undefined){
                alert('Error de Usuario')
              } else{
                var Usuario = response.data[0].USUARIO;
                var id_usuario = response.data[0].ID_USER;
                var rol = response.data[0].ROL;
                var id_rol = response.data[0].ID_ROL
                scope.$session.start();
                scope.$session.set('Usuario', Usuario);
                scope.$session.set('id_usuario', id_usuario);
                scope.$session.set('Rol', rol);     
                scope.$session.set('id_rol', id_rol);

                scope.$router.push('/inicio')
              }
            })
        },

    },
    beforeCreate: function () {

        var logged= this.$session.exists();
        if (logged) {
        this.$router.push('/inicio')
        }
    },

  created(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1{
  font-size: 250%;
  color:rgba(0, 0, 0, 0.726);
  }
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #1b252780;
}


.container{
  background-color: rgba(45, 61, 58, 0.692)
}

</style>
