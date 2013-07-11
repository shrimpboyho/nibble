var express = require('express');
var port = process.argv[3];
var app = express();

app.listen(port);
console.log("Listening on port " + port);

console.log("Welcome to nibble");
