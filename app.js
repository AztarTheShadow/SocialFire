const PORT = 8080;

var express = require ("express");
var app = express ();

app.get ('/', function (req, res) {
   res.sendFile (__dirname + '/public/index.html');
});

app.get ('/*', function (req, res) {
   res.sendFile (__dirname + '/public' + req.url);
})

app.listen (PORT, function (err, res) {
   if (err) {
      console.log ("Server error: ", err);
   } else {
      console.log ("Server is running...");
   }
});
