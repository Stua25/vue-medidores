const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors');


const app = express();
var port = process.env.PORT || 4000;


//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));


//Routes

app.post('/logIng', (req, res) => {
  
    var email = req.body.email;
    var password = req.body.password;
  
    const db = require('./DB.js');
    db.query('SELECT *FROM USER WHERE EMAIL =? AND PASSWORD = ?', [email, password], function (error, results, fields) {
        if (error) throw error; 
        if(results[0]== undefined){
          res.send('Usuario invalido')
        }else{
            res.json(results[0])
        }
          
        
      });
    });
userRoutes = require('./routes/user.js');
app.use('/user', userRoutes);

var server = app.listen(port, function(){
    console.log('Listening on port ' + port);
  });