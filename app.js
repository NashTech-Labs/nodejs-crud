var express = require ('express');
var todoController = require('./controllers/todoController');
var app = express();

//setting template engine
app.set('view engine','ejs');

//setting assets/static files
app.use(express.static('./public'));

//Firing controllers
todoController(app);


//listen to port
app.listen(3000);
console.log("Server started at port number: 3000");
