<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <b-container>
       <b-form class="back">
        <b-form-group id="correoIngresar"
                      label="Correo Electronico"
                      label-for="correo"
                      description="Nunca compartiremos su informacion personal."
                      style="text-align: left">
          <b-form-input id="correo"
                        type="email"
                        v-model="form.email"
                        required
                        placeholder="Ingrese su correo">
          </b-form-input>
        </b-form-group>
        <b-form-group id="passwordIngresar"
                      label="Contrase;a"
                      label-for="password"
                      style="text-align: left">
          <b-form-input id="password"
                        type="password"
                        v-model="form.password"
                        required
                        placeholder="Ingrese su contrase;a">
          </b-form-input>
        </b-form-group>
     
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-container>
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
