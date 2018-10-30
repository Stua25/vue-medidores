const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors');


const app = express();
var port = process.env.PORT || 4000;


//Authentication
var session = require('express-session');
var passport = require('passport');


//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

app.use(session({
    secret: 'aalkjdfasjd',
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true }
  }));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));


//Routes

app.post('/logIng', (req, res) => {

    // const url = require('url')
    
    var email = req.body.email;
    var password = req.body.password;
  
    const db = require('./DB.js');

    db.query('SELECT *FROM USER WHERE EMAIL =? AND PASSWORD = ?', [email, password], function (error, results, fields) {
        if (error) throw error; 
        if(results[0]== undefined){
          res.redirect('http://192.168.0.3:8080')
        }else{
            const user_id = results[0].ID_USER
            console.log(user_id);
            req.login(user_id, function (err) {             
                res.redirect('http://192.168.0.3:8080/inicio')
            });
        } 
      });
    });

passport.serializeUser(function(user_id, done){
    done(null, user_id)
});

passport.deserializeUser(function(user_id, done){
    done(null, user_id);
});

userRoutes = require('./routes/user.js');
app.use('/user', userRoutes);

var server = app.listen(port, function(){
    console.log('Listening on port ' + port);
  });