<template>
    <div>
        <div class="container">
        <div class="notification">
            <div class="column is-three-fifths is-offset-one-fifth">
                <span style="font-size: 150%" >{{user.Rol}}</span> 

                <p style="font-size: 150%;text-align: center;margin: 4%;">
                      {{user.Nombre}}                      
                </p> 

                <b-field>
                    <b-radio-button v-model="year"
                    native-value="2017"
                    @click="goToIndicadores">
                        <span>2017</span>
                    </b-radio-button>

                    <b-radio-button v-model="year"
                    native-value="2018"
                    @click="goToIndicadores">        
                        <span>2018</span>
                    </b-radio-button>

                    <b-radio-button v-model="year"
                    native-value="2019"
                    @click="goToIndicadores">
                        2019
                    </b-radio-button>
                </b-field>

            </div>
        </div>
        </div>
    </div>
</template>


<script>
export default {
    data(){
        return{
            user: {
                codigoUsuario: 0, 
                Nombre: '', 
                Rol: '',
            }, 

            year: 0,
        }
    },

    methods: {
        goToIndicadores(){
            
        },
    },
    beforeCreate: function () {

        var logged= this.$session.exists();
        if (!logged) {
            this.$router.push('/');
            this.$parent.islogged = false;
        }
        this.$parent.islogged = true;
    },
    created(){
        this.user.Nombre = this.$session.get('Usuario');
        this.user.codigoUsuario = this.$session.get('id_usuario');
        this.user.Rol = this.$session.get('Rol');

        
    }, 

    watch:{
        year:{
            handler: function(){
                
            this.$session.set('Year', this.year);
            this.$router.push('/indicadores')
                
            }
            
        }
    }
    
}
</script>

<style lang="scss" scoped>

.input.is-rounded, .taginput .is-rounded.taginput-container.is-focusable {
    text-align: center;
    background-color: #a9eeed67;
    font-size: 150%;
}

.field.has-addons{
    justify-content: center
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


</style>
