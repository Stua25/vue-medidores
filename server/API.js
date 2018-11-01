const API = require('express').Router();

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
            console.log(err)
          }else{
                res.json(result);
                console.log(result)
          }
    })

});

API.get('/indicador/medidores', (req, res)=>{
    
});


module.exports = API;