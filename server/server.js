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
userRoutes = require('./routes/user.js');
app.use('/user', userRoutes);

var server = app.listen(port, function(){
    console.log('Listening on port ' + port);
  });