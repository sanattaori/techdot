var express = require('express');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');	
var app = express();
app.use( bodyParser.json() )
app.use(morgan('combined'));


app.use("/", express.static("ui"));

var username;
var password;

app.post('/login', function(req, res) {
    
	console.log(req.body);
    username = req.body.username;
    password = req.body.password;
    
    if (username == "admin" && password == "password") {
    	res.status(200).send({ message: 'Login success' });

    } else {
    	res.status(500).send({ message: 'error' });
    }
});

var port = 8080;
app.listen(8080, function () {
  console.log(`app listening on port ${port}!`);
});