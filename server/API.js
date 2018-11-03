const API = require('express').Router();
var formidable = require('formidable');
var fs = require('fs')

API.post('/indicadores', (req, res)=>{

    var rol = req.body.rol;

    const db = require('./DB.js');
    db.query('CALL indicadores_rol (?)', rol, function(err, result, fields){
       
        if(err) throw (err);       
        if(result[0] == undefined){
            res.json({error: 'Ha habido un problema, intente nuevamente'});
          }else{
                res.json(result[0]);
          }
    })

});

API.post('/departamentos', (req, res)=>{

    const db = require('./DB.js');
    var id_user = req.body.id_user
    db.query('CALL departamentoByUser(?)',id_user,function(err, result, fields){
       
        if(err) throw (err);       
        if(result[0] == undefined){
            res.json({error: 'Ha habido un problema, intente nuevamente'});
          }else{
                res.json(result);
          }
    })

});

API.post('/distrito', (req, res)=>{
    const db = require('./DB.js');
    var departamento = req.body.Id_Departamento
    db.query('SELECT * FROM Distrito WHERE id_Departamento = ? ',departamento,function(err, result, fields){
        if(err) throw (err);       
        if(result == undefined){
            res.json({error: 'Ha habido un problema, intente nuevamente'});
          }else{
                res.json(result);
          }
    })
});

API.post('/savedNumPlaza', (req, res)=>{
    const db = require('./DB.js');
    var data = req.body.data;

    db.query('SELECT correlativo as Distrito, num_plazas as NumeroPlazas From medidor_distrito_detalle WHERE id_indicador = ? and estado = 1 and num_trimestres = ?  and user_create = ? and id_departamento = ?', 
        [data.indicador, data.trimestre, data.user, data.departamento], function(err, result, fields){
            if(err) throw (err);

            if(result == undefined){
                res.json({error: 'Ha habido un problema, intente nuevamente'});
            } else{
                res.json(result)
            }
        }
    )

});

API.post('/saveNumPlaza', (req, res)=>{
    const db = require('./DB.js');
    var data = req.body.dataToSave;

    db.query('INSERT INTO medidor_distrito_detalle (Correlativo, num_plazas,num_trimestres,id_indicador,estado, user_create, fecha_crea, id_departamento )VALUES (?,?,?,?,?, ?, NOW(), ?)', 
    [data.distrito, data.numeroPlaza, data.periodo, data.medidor, 1, data.User, data.departamento], function(err, result, fields){
        if(err) throw (err);
        if(result == undefined){
            res.json({error: 'Ha habido un problema, intente nuevamente'});
           
          }else{
                res.json({stado: 'Guardado'});
               
          }
        
    })
});

API.post('/medidores', (req, res)=>{
    const db = require('./DB.js');
    var id_Indicador = req.body.id_Indicador
    db.query('SELECT id_medidor, Descripcion, tipo FROM medidor where id_Indicador = ?',id_Indicador,function(err, result, fields){
        if(err) throw (err);       
        if(result == undefined){
            res.json({error: 'Ha habido un problema, intente nuevamente'});
          }else{
                res.json(result);
          }
    })
});

API.post('/upload', (req, res)=>{

    var form = new formidable.IncomingForm();
    setBreakpoint()
    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
        var newpath = 'D:\USUARIO\Desktop\New web Proyect CLI\pweb\UploadedFiles' + files.filetoupload.name;
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            res.json({uploaded: true});
            res.end();
          });
    });
});

API.get('/indicador/medidores', (req, res)=>{
    
});


module.exports = API;