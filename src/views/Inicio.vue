<template>
    <div>
        <div class="container">
            <b-jumbotron>
            <span style="font-size: 150%" >{{user.Rol}}</span> 
            <b-field>
                 <b-input style="font-size: 100%" disabled v-model="user.Nombre" rounded></b-input>
            </b-field>

            <b-container class="bv-example-row">          
                <b-row>
                    <b-col></b-col>
                    <b-col>
                        <b-field>
                            <b-radio-button v-model="year"
                                native-value="2017"
                                type="is-success">
                                <span>2017</span>
                            </b-radio-button>

                            <b-radio-button v-model="year"
                                native-value="2018"
                                type="is-success">
                                <span>2018</span>
                            </b-radio-button>

                            <b-radio-button v-model="year"
                                native-value="2019"
                                type="is-success">
                                <span>2019</span>
                            </b-radio-button>
                        </b-field>

                    </b-col>
                    <b-col></b-col>
                </b-row>

                <b-row>

                </b-row>
            </b-container>
        </b-jumbotron>

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
                this.$session.set('Year', this.year)
            }
            
        }
    }
    
}
</script>

<style>

</style>
