const user = require('express').Router();

user.route('/').post((req, res)=>{

    // const db = require('../DB.js');
    // db.query('SELECT *FROM USER WHERE EMAIL = ? AND PASSWORD = ?', [email, password], function (error, results, fields) {
    //     if (error) throw error; 
    //     if(results == undefined){
    //       res.send('Usuario invalido')
    //     }else{
    //         console.log(results)
    //     }   
    //   });

});


module.exports = user;