const institucionRoutes = require('express').Router();

institucionRoutes.route('/').get((req, res)=>{
    // var email = req.body.email;
    // var password = req.body.password;
  
    const db = require('../DB.js');
    // var sql = 'CALL LogIn(?,?)';
    db.query('SELECT *FROM USER', function (error, results, fields) {
        if (error) throw error; 
        if(results == undefined){
          res.send('Usuario invalido')
        }else{
            res.json(results)
        }   
      });

});


module.exports = institucionRoutes;