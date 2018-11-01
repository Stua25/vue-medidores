<template>
 <div>
    <div class="container">
        <div class="notification">
            <div class="columns is-mobile">
                <div class="column  column is-11 is-offset-1">
                    <span style="font-size: 150%" >{{user.Rol}}</span> 
                    <p style="font-size: 150%;">
                        {{user.Nombre}}                      
                    </p> 
                    <a style="font-size: 150%" class="button is-light">{{year}}</a>
                </div>
            </div>
            <div class="columns is-mobile">
                <div class="column  column is-11 is-offset-1" style="font-size: 120%" >
                    {{indicador.Nombre}} - {{indicador.Descripcion}}
                </div>
            </div>

            <div class="columns is-mobile">
                <div class="column  column is-11 is-offset-1" style="font-size: 120%" >
                    <div style="display: inline; margin-top: 3px">
                        {{periodo}}
                    </div>

                    <b-field style="display: -webkit-inline-box;">
                        <b-radio-button v-model="periodoSelected"
                        native-value="1">
                            <span>1</span>
                        </b-radio-button>

                        <b-radio-button v-model="periodoSelected"
                        native-value="2">        
                            <span>2</span>
                        </b-radio-button>

                        <b-radio-button v-model="periodoSelected"
                        native-value="3">
                            <span>3</span>
                        </b-radio-button>

                        <b-radio-button v-model="periodoSelected"
                        native-value="4">
                            <span>4</span>
                        </b-radio-button>
                    </b-field>
                </div>
            </div>
            <div class="columns is-mobile">
                <div class="column  column is-11 is-offset-1">
                    <b-select @input="changeMonth"
                        placeholder="Seleccione Un Departamento"
                        style="display: -webkit-inline-box;"
                        v-model="departamentoSelected"
                        rounded>
                        <option v-for="Departamento in Departamentos" 
                            :value="Departamento.Id_Departamento" 
                            :key="Departamento.Id_Departamento">
                            {{Departamento.Codigo_Departamento}} - {{Departamento.Nombre}}
                        </option>
                    </b-select>
                </div>
            </div> 

            <div class="columns is-mobile" v-for="distrito in Distritos" 
                    :value="distrito.Correlativo" 
                    :key="distrito.Correlativo">
                <div class="column is-11 is-offset-1">
                    <span><b>Distrito: </b> &nbsp;&nbsp;</span>
                    <span>
                        {{distrito.id_Departamento}}-{{distrito.codigo_Distrito}}
                    </span>

                    <div class="columns is-mobile">
                        <div class="column is-half is-offset-one-quarter">
                            s
                        </div>
                    </div>                   
                </div>
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
                Nombre: '',
                codigoUsuario: '',
                Rol: 0,
            },
            year: 0,
            indicador: {},
            periodo: '',
            isImageModalActive: false,
            periodoSelected: 0,
            Departamentos: [],
            departamentoSelected: 0,
            Distritos: [],

        }
    }, 

    methods: {
        getDepartamentos(){
            var scope = this;
            this.$http.post('http://192.168.1.20:4000/api/departamentos', 
            {
                id_user: scope.user.codigoUsuario
            }).then(function(response){
                if(response.data.length == 0 || response.data == undefined){

                } else{
                    scope.Departamentos = response.data[0];                  
                }
            })
        }, 

        changeMonth(){
            var scope = this;
            debugger
            this.$http.post('http://192.168.1.20:4000/api/distrito',
            {
                Id_Departamento: this.departamentoSelected
            }).then(function(response){
                if(response.data.length == 0 || response.data == undefined){

                } else{
                    scope.Distritos = response.data;   
                    debugger                     
                }
            });

        },
    }, 

    beforeCreate(){
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
        this.year = this.$session.get('Year');
        this.indicador = this.$session.get('Indicador')

        switch (this.indicador.Periodo) {
            case 2:
                this.periodo = 'Semestre'

            break;
            case 4:
                this.periodo = 'Trimestre'
            break;
            case 6:
                this.periodo = 'Bimestre'
            break;
            case 12:
                this.periodo = 'Mes'
            break;
        }
        this.getDepartamentos();

    },

    watch: {

    }
}
</script>

<style>
.field{
    display: '-webkit-inline-box';
}

</style>

