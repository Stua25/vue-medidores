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
                        :native-value="1"
                        @click="getSavedData">
                            <span>1</span>
                        </b-radio-button>

                        <b-radio-button v-model="periodoSelected"
                        :native-value="2"
                        @click="getSavedData">        
                            <span>2</span>
                        </b-radio-button>

                        <b-radio-button v-model="periodoSelected"
                        :native-value="3"
                        @click="getSavedData">
                            <span>3</span>
                        </b-radio-button>

                        <b-radio-button v-model="periodoSelected"
                        :native-value="4"
                        @click="getSavedData">
                            <span>4</span>
                        </b-radio-button>
                        <span class="button" @click="doSomething">
                           <font-awesome-icon icon="check-circle" style="margin-right: 15px; display: inline"/>
                        </span>
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
            <div v-if="mostrarDistritos" class="columns is-mobile" v-for="distrito in Distritos" 
                    :value="distrito.Correlativo" 
                    :key="distrito.Correlativo">
                <div class="column is-11 is-offset-1">
                    <span><b>Distrito: </b> &nbsp;&nbsp;</span>
                    <span>
                        {{distrito.id_Departamento}}-{{distrito.codigo_Distrito}}
                    </span>

                    <div class="columns is-mobile">
                        <div class="column is-half is-offset-one-quarter">
                            {{medidor.Descripcion}}
                            <b-input v-model="distrito.numeroPlazas"></b-input>
                        </div>
                    </div> 
                    <div class="columns is-mobile">
                        <div class="column is-half is-offset-one-quarter">
                            <b-field label="Numero total de Plazas de trabajo del SINAE">
                                <b-input v-model="distrito.total" disabled></b-input>
                            </b-field>
                        </div>
                    </div>
                    <div v-if="distrito.canEdit" class="columns is-mobile">
                        <div class="column is-half is-offset-one-quarter">
                            <a class="button is-rounded" @click="saveData(distrito.Correlativo, distrito.numeroPlazas, medidor.id_medidor, periodoSelected, distrito.total)">Guardar</a>
                        </div>
                    </div>  
                    <div v-else class="columns is-mobile">
                        <div class="column is-half is-offset-one-quarter">
                            <a class="button is-rounded" @click="editData(distrito.Correlativo, distrito.numeroPlazas, medidor.id_medidor, periodoSelected, distrito.total)">Editar</a>
                        </div>
                    </div>                  
                </div>
            </div> 
            <div class="columns is-mobile">
                <div class="column is-11 is-offset-1">
                   <form @submit.prevent="upload" enctype="multipart/form-data">
                            <label>
                                <font-awesome-icon icon="file-upload" />&nbsp;Seleccionar un archivo
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
            medidor: [],
            fileToUpload: '',
            mostrarDistritos: false,
            mostratTrimestre: false,
            files: new FormData(),

            savedData: [],

        }
    }, 

    methods: {
        doSomething(){
            this.periodoSelected = new Number(this.periodoSelected) ;
            this.getSavedData();

        },
        fileChange(fileList) {
            this.files.append("file", fileList[0], fileList[0].name);
        },

        goBack(){
            this.$router.push('/indicadores')
        },
        editData(idDistrito, numeroPlaza, id_medidor, periodo, total){
            var scope = this;
            var dataToSave = {
                distrito: idDistrito,
                numeroPlaza: numeroPlaza,
                medidor: id_medidor,
                periodo: periodo,
                User: this.$session.get('id_usuario'),
                departamento: this.$session.get('departamento')
            }
           if(numeroPlaza >= total ){
               this.$toast.open({
                   message: 'El numero de la plaza deber ser menor al total de las plazas',
                   type: 'is-danger'
               })
                return;
           }
           else {

            this.$http.post('http://192.168.1.20:4000/api/editNumPlaza', 
            {
                dataToSave: dataToSave
            }).then(function(response){
                if(response.data.length == 0 || response.data == undefined){

                } else{
                    var notification = response.data;
                    scope.$toast.open({
                    message: 'Cambios Guardados',
                    type: 'is-success'
                })
                    return;
                        
                }

            })
           }
            
        },

        saveData(idDistrito, numeroPlaza, id_medidor, periodo, total){
            var scope = this;
            var dataToSave = {
                distrito: idDistrito,
                numeroPlaza: numeroPlaza,
                medidor: id_medidor,
                periodo: periodo,
                User: this.$session.get('id_usuario'),
                departamento: this.$session.get('departamento')
            }
           if(numeroPlaza >= total ){
               this.$toast.open({
                   message: 'El numero de la plaza deber ser menor al total de las plazas',
                   type: 'is-danger'
               })
                return;
           }

          else if(this.periodoSelected == 0 ){
               this.$toast.open({
                   message: 'Favor de Seleccionar un trimestre',
                   type: 'is-danger'
               })
                return;
           } 
           
           else {

            this.$http.post('http://192.168.1.20:4000/api/saveNumPlaza', 
            {
                dataToSave: dataToSave
            }).then(function(response){
                if(response.data.length == 0 || response.data == undefined){

                } else{
                    var notification = response.data;
                    scope.$toast.open({
                    message: 'Cambios Guardados',
                    type: 'is-success'
                })
                    return;
                        
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
                    
                    
                }
            })
        }, 

        changeDepartamento(){
            var scope = this;
            this.$session.set('departamento', this.departamentoSelected)
            
            if(this.departamentoSelected != 0){
                this.mostratTrimestre = true;
            }
            
            this.$http.post('http://192.168.1.20:4000/api/distrito',
            {
                Id_Departamento: this.departamentoSelected
            }).then(function(response){
                if(response.data.length == 0 || response.data == undefined){
                    scope.mostrarDistritos =false;

                } else{
                    scope.mostrarDistritos = true;
                    scope.Distritos = response.data;  
                    scope.Distritos.forEach(element => {
                        element.numeroPlazas = 0;
                        element.canEdit = true;
                    });
                    
                }
            });

        },

        setValues(){
            this.Distritos.forEach(element=>{
                element.numeroPlazas = 0;
                element.canEdit= true;
            })
        },

        upload() {
            debugger
            var scope = this;
            this.$http.post('http://192.168.1.20:4000/api/upload', this.files)
            .then(function(response) {
                if(response.data.length == 0 || response.data == undefined){
                    scope.$toast.open({
                        message: `Error al conectar intente de nuevo`,
                        type: 'is-danger'
                    })
                } else{
                    var status = response.data.status;
                    debugger
                    if(status == 'uploaded'){
                        scope.$toast.open({
                            message: `Archivo Guardado`,
                            type: 'is-success'
                        })
                    } else{
                        scope.$toast.open({
                            message: `Error al Guardar el Archivo`,
                            type: 'is-danger'
                        })
                    }
                }
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

            },
            deep: true
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

