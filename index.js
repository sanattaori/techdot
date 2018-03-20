var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


app.use("/", express.static("ui"));



var port = 8080;
app.listen(8080, function () {
  console.log(`app listening on port ${port}!`);
});
