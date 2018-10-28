<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="container">
        <div class="row">
            <div class="col align-self-center">
                <form  method="POST" action="http://192.168.0.3:4000/logIng"> <!-- method="POST" action="http://localhost:4000/logIng"-->
                   <div class="form-group">
                        <label for="exampleInputEmail1">Correo Electrónico</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingrese su Correo Electrónico" name="email" required>
                        <small id="emailHelp" class="form-text text-muted">Ingrese el correo dado por la empresa par acceder.</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Contraseña</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" name="password" placeholder="Ingrese su Contraseña" required>
                    </div>
                    <p style="text-align: center">
                        <b-button type="submit" variant="primary">Submit</b-button>                       
                        <!-- <v-ons-button modifier="large" style="margin: 6px 0" type="submit">
                            <router-link :to="{ name: 'InstitucionesHome' }" class="btn btn-primary">
                                Instituciones
                            </router-link>
                            Submit
                        </v-ons-button> -->
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
    
      logIn(){
            let uri = 'http://localhost:4000/logIng';
                this.axios.post(uri).then((response) => {
                    var result = response.data;
                    debugger
                });
        }

    },

  created(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
  color: #42b983;
}

</style>
