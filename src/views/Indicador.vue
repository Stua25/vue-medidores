<template>
 <div>
    <div class="container">
        <div class="notification">
            <div class="column is-three-fifths is-offset-one-fifth">
                <span style="font-size: 150%" >{{user.Rol}}</span> 
                 <p style="font-size: 150%;text-align: center;margin: 4%;">
                      {{user.Nombre}}                      
                </p> 
                <a style="font-size: 150%" class="button is-light">{{year}}</a>
            </div>
            <div class="boton is-fullwidth" @click="goToMedidor(key, value.Nombre)" v-for="(value, key) in indicadores" v-bind:key='key'>
                <td style="margin-left: 5px">
                     <font-awesome-icon icon="chevron-circle-right" style="margin-right: 15px; display: inline"/>
                </td>
                <td>
                    <div style="display: inline">                   
                        {{value.Nombre}} - {{value.Descripcion}}
                    </div>
                </td>
                
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

            indicadores: [],


        }
    }, 

    methods:{
        getIndicadores(){
            var scope = this;
            this.$http.post('http://192.168.1.20:4000/api/indicadores', 
            {
                rol: this.$session.get('id_rol')
                }).then(function(response){
                
                if(response.data.length == 0 || response.data == undefined){

                } else{
                    scope.indicadores = response.data;   
                    debugger                     
                }
                })
        }, 

        goToMedidor(key, nombre){
            var indicador = {
                id_Indicador: this.indicadores[key].ID_INDICADOR,
                Nombre: this.indicadores[key].Nombre, 
                Descripcion: this.indicadores[key].Descripcion,
                Periodo: this.indicadores[key].Periodo
            }
            this.$session.set('Indicador', indicador);
            var route = '/indicador/'+nombre;
            this.$router.push(route)
            
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
        this.year = this.$session.get('Year');

        this.getIndicadores();
        
    },
    
}
</script>


<style scoped>
.button{
    margin: 0.5%;
    justify-content: left;
}

.boton{
    margin: 0.9%;
    font-size: 125%;
    display:block;
	border-style:solid;
    border-radius: 10px;
	border-color:rgba(53, 161, 223, 0.397);
	border-width:0.2px 0.4px 0.4px 0.2px;
	background:rgba(181, 185, 241, 0.274);
	color:#333;
	line-height:2;
	text-align:left;
	text-decoration:none;
	font-weight:900;
    justify-content: left;
    word-wrap:break-word; 
}

.boton:hover{
	border-color: rgba(97, 192, 247, 0.39);
	border-width:4px 3px 3px 4px;
	color:#000;
    cursor:pointer;
}



</style>
