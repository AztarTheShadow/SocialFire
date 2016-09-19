var express = require ('express');
var app = express ();

app.set ('port', process.env.PORT, 8080);

app.get ('/', function (req, res) {
   res.send (__dirname + 'index.html');
});

app.listen ('port', function () {
   console.log ("We are listening");
});
