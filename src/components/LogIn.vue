<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="container">
        <div class="notification">
            <div class="column is-three-fifths is-offset-one-fifth">
              <form @submit.prevent="ingresar"><!-- method="POST" action="http://localhost:4000/logIng"-->
                   <b-field label="Correo">
                        <b-input type="email"
                           v-model="form.email"
                           rounded>
                        </b-input>
                    </b-field>
                    <b-field label="Contaseña">
                        <b-input type="password"
                            v-model="form.password"
                            password-reveal
                            rounded>
                        </b-input>
                    </b-field>
                    <p style="text-align: center">
                        <input class="button is-rounded" type="submit" value="Ingresar">                       
                    </p>
                  </form> 
            </div>
        </div>
    </div>
    
    <b-modal :active.sync="isImageModalActive">
      <div class="container">
        <div class="notification">
          <header class="modal-card-head">
              <p class="modal-card-title">Error Al autenticar</p>
          </header>
          <section class="modal-card-body">
              <p class="modal-card-title">Intentar Nuevamente</p>
          </section>
          <footer class="modal-card-foot">
              <button class="button" type="button" @click="isImageModalActive = false">Cerrar</button>
          </footer>
          </div>
        </div>
      </b-modal>
       
  </div>
</template>

<script>
export default {
  name: 'LogIn',
  props: {
    msg: String
  }, 

  data(){
    return{
      form: {
        email: '',
        password: ''
      }, 
      isImageModalActive: false,
    }
  }, 

  methods: {
    
        ingresar(){
          var scope = this
          this.$http.post('http://192.168.1.20:4000/logIng', 
          {
            user: this.form.email, 
            password: this.form.password
            }).then(function(response){
              
              if(response.data.length == 0 || response.data == undefined){
                scope.isImageModalActive = true;
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
<style scoped >
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
body{
  background-image: url('../assets/lake.jpg');

  height: 100%; 
  width: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}



.notification{
  background-color: #ffffff40;
  text-align: left;
}

</style>
