<template>
 <div>
    <div class="container">
        <div class="notification">
            <div class="columns is-mobile">
                <div class="column  column is-11 is-offset-1">
                      <div class="level-left">
                        <div class="level-item" style="font-size: 200%" @click="goBack">
                            <font-awesome-icon icon="chevron-circle-left" style="margin-right: 15px; display: inline"/> 
                        </div>
                    </div>
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
                        native-value="1"
                        @click="getSavedData">
                            <span>1</span>
                        </b-radio-button>

                        <b-radio-button v-model="periodoSelected"
                        native-value="2"
                        @click="getSavedData">        
                            <span>2</span>
                        </b-radio-button>

                        <b-radio-button v-model="periodoSelected"
                        native-value="3"
                        @click="getSavedData">
                            <span>3</span>
                        </b-radio-button>

                        <b-radio-button v-model="periodoSelected"
                        native-value="4"
                        @click="getSavedData">
                            <span>4</span>
                        </b-radio-button>
                        <b-radio-button v-model="periodoSelected"
                        native-value="5"
                        @click="getSavedData">
                            <span>5</span>
                        </b-radio-button>
                        <b-radio-button v-model="periodoSelected"
                        native-value="6"
                        @click="getSavedData">
                            <span>6</span>
                        </b-radio-button>
                    </b-field>
                </div>
            </div>
            <div class="columns is-mobile">
                <div class="column  column is-11 is-offset-1">
                    <b-select @input="changeDepartamento"
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
            <div class="columns is-mobile">
                <div class="column  column is-11 is-offset-1">
                    <b-select @input="changeDistrito"
                        placeholder="Seleccione Un Distrito"
                        style="display: -webkit-inline-box;"
                        v-model="distritoSelected"
                        rounded>
                        <option v-for="distrito in Distritos" 
                            :value="distrito.Correlativo" 
                            :key="distrito.Correlativo">
                             {{distrito.codigo_Distrito}}
                        </option>
                    </b-select>

                </div>
            </div>  
            <div v-if="mostrarCentros" class="columns is-mobile" v-for="centro in centroEducativos" 
                    :value="centro.idcentro_educativo" 
                    :key="centro.idcentro_educativo">
                <div class="column is-11 is-offset-1">
                    <b-field label ="Centro Educativo">
                        <b-input v-model="centro.Nombre" :readonly="centro.canEdit"></b-input>
                    </b-field>
                    <div class="columns is-mobile">
                        <div class="column is-half is-offset-one-quarter">
                            <span>
                                {{medidor.Descripcion}}
                            </span>
                            <b-input v-model="centro.Dato"></b-input>
                        </div>
                    </div> 
                    <div class="columns is-mobile">
                        <div class="column is-half is-offset-one-quarter">
                            <span>
                                adjuntar Listado de Asistencia
                            </span>
                            <a class="button is-rounded" >Adjuntar Archivo</a>
                        </div>
                    </div>  

                    <div class="columns is-mobile">
                        <div class="column is-half is-offset-one-quarter">
                            <a class="button is-rounded" @click="saveData(centro.idcentro_educativo, centro.Dato, medidor.id_medidor)" v-show="centro.canEdit">Guardar</a>
                        </div>
                    </div>                    
                </div>
            </div> 

            <div class="columns is-mobile">
                <div class="column is-11 is-offset-1">
                   <form @submit.prevent="upload" enctype="multipart/form-data">
                            <label>
                                <font-awesome-icon icon="file-upload" />
                                <input  type="file" accept=".pdf" name="filename" @change="fileChange($event.target.files)">
                            </label>
                            <div class="columns is-mobile">
                                <div class="column is-11 is-offset-1">
                                    <input class="button" type="submit" value="Guardar Archivo">
                                </div>
                            </div>      
                    </form>
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
            distritoSelected: 0,
            centroEducativos: [],
            medidor: {},
            fileToUpload: '',
            mostrarDistritos: false,
            mostrarCentros: false,

        }
    }, 

    methods: {

        goBack(){
            this.$router.push('/indicadores')
        },
        saveData(idCentro, Dato, id_medidor){
            if(Dato == 0 || Dato == undefined){
                this.$snackbar.open('Debe ingresar un dato');
                return;
            } else{
            
                var scope = this;
                var dataToSave = {
                    idCentro: idCentro,
                    distrito: this.$session.get('distrito'),
                    dato: Dato,
                    medidor: id_medidor,
                    periodo: this.periodoSelected,
                    User: this.$session.get('id_usuario'),
                    departamento: this.$session.get('departamento')
                }
                debugger
            if(this.periodoSelected == 0 ){
                alert("No se selecciono el Bimestre");
                return;
            } 

            this.$http.post('http://192.168.1.20:4000/api/saveCentroEducativo', 
            {
                dataToSave: dataToSave
            }).then(function(response){
                if(response.data.length == 0 || response.data == undefined){

                } else{
                    var notification = response.data;
                    scope.centroEducativos.forEach(centro=>{
                        if(centro.idcentro_educativo == idCentro){
                            centro.canEdit = false 
                            debugger
                        }
                    })
                    scope.$toast.open({
                        message: notification.estado,
                        type: 'is-success'
                    })
                        
                }

            })
            }
        },

        getSavedData(){
            var scope = this;
            var indicador = this.$session.get('Indicador')
            var data = {
                indicador: indicador.id_Indicador,
                trimestre: parseInt(this.$session.get('Trimestre')),
                user: this.$session.get('id_usuario'), 
                departamento: this.$session.get('departamento')
            }
            this.$http.post('http://192.168.1.20:4000/api/savedNumPlaza', 
           {
               data: data
           }).then(function(response){
               if(response.data.length == 0 || response.data == undefined){
                scope.setValues();  
               } else{ 
                   debugger
                   
                    scope.setValues();
                    var savedData = response.data;
                    savedData.forEach(element =>{
                        scope.Distritos.forEach(distrito =>{
                            if(distrito.Correlativo == element.Distrito){
                                distrito.numeroPlazas = element.NumeroPlazas, 
                                distrito.canEdit = false;
                            }
                        })    
                    })              
               }
           })    
        },

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

        
        getMedidores(){
            var scope = this;
            var indicador = this.$session.get('Indicador');
            
            this.$http.post('http://192.168.1.20:4000/api/medidores', 
            {
                id_Indicador: indicador.id_Indicador
            }).then(function(response){
                if(response.data.length == 0 || response.data == undefined){

                } else{
                        
                    scope.medidor = response.data[0]; 
                    debugger
                    
                    
                }
            })
        }, 

        changeDepartamento(){
            var scope = this;
            this.$session.set('departamento', this.departamentoSelected)
            
            this.$http.post('http://192.168.1.20:4000/api/distrito',
            {
                Id_Departamento: this.departamentoSelected
            }).then(function(response){
                if(response.data.length == 0 || response.data == undefined){
                } else{
                    scope.Distritos = response.data;                    
                    
                }
            });

        },

        changeDistrito(){
            debugger
            var scope = this;
            this.$session.set('distrito', this.distritoSelected)
            
            this.$http.post('http://192.168.1.20:4000/api/centro-educativo',
            {
                distrito: this.distritoSelected
            }).then(function(response){
                if(response.data.length == 0 || response.data == undefined){
                    scope.mostrarCentros = false;
                } else{
                    scope.mostrarCentros = true;
                    scope.centroEducativos = response.data;
                    scope.centroEducativos.forEach(centro =>{
                        centro.canEdit = true
                    })   
                    debugger                 
                    
                }
            });


        },

        setValues(){
            this.Distritos.forEach(element=>{
                element.numeroPlazas = 0;
                element.canEdit= true;
            })
        },

        onFileSelected (event) {

            
            
            //const formData = new FormData();
            //formData.append("my-file", file);
            this.$http.post('http://192.168.1.20:4000/api/upload', event)
            .then(function(response) {
                 
                    
                
            })
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
        this.getMedidores();

    },

    watch: {
        periodoSelected: {
            handler: function(evt){
                this.$session.set('Trimestre', evt);
                this.getSavedData();
            }
        }

    }
}
</script>

<style>

  #app{
    height: 100%;
    width: 100%;
    margin: 0;
    
    background-image: url('../../assets/lake.jpg');
    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

.field{
    display: '-webkit-inline-box';
}

</style>

