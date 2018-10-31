<template>
    <div>
        <div class="container">
        <div class="notification">
            <div class="column is-three-fifths is-offset-one-fifth">
                <span style="font-size: 150%" >{{user.Rol}}</span> 
                <b-field>
                    <b-input  disabled v-model="user.Nombre" rounded></b-input>
                </b-field>

                <b-field>
                    <b-radio-button v-model="year"
                    native-value="2017">
                        <span>2017</span>
                    </b-radio-button>

                    <b-radio-button v-model="year"
                    native-value="2018">        
                        <span>2018</span>
                    </b-radio-button>

                    <b-radio-button v-model="year"
                    native-value="2019">
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

<style scoped>

.input.is-rounded, .taginput .is-rounded.taginput-container.is-focusable {
    text-align: center;
    background-color: #a9eeed67;
    font-size: 150%;
}

</style>
