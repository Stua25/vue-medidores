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
                Nombre: 'Victor Estrada', 
                Rol: 'Director Ejecutivo',
            }, 

            year: 0,
        }
    }
    
}
</script>

<style>

</style>
