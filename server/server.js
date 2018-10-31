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
    
    var user = req.body.user;
    var password = req.body.password;  
    const db = require('./DB.js');

    db.query('CALL LogIn(?, ?)', [user, password], function (error, results, fields) {
        if (error) throw error; 
        if(results[0]== undefined){
          res.json({error: 'Ha habido un problema, intente nuevamente'});
        }else{
                  res.json(results[0]);
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