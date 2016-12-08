var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to mongoose database: online mLab database
mongoose.connect('mongodb://test:test@ds053954.mlab.com:53954/todo');

//Creating a schema that contains only 1 field as datatype string
var todoSchema = new mongoose.Schema({
  item: String
})

//Creating schema for sigup user
var signupSchema = new mongoose.Schema({
  name: String,
  email: String
})


//creating a model for todo
var Todo = mongoose.model("Todo", todoSchema);

//Creating model for signup
var Signup = mongoose.model("Signup", signupSchema);


//Saving an item in schema of mongoose online
  // var itemOne = Todo({item: "buy gun"}).save(function(err){
  //   console.log("item saved")
  // })

//Adding static data
  // var data = [ {item:'gym'}, {item:'code'}, {item:'go out on bike'} ];

var urlencodedParser = bodyParser.urlencoded({extended:false});


module.exports = function (app){

app.get('/todo', function(req, res){

  //Get data from mongoose and pass it to the view
    Todo.find({}, function(err, data){
      if(err) throw err;
      res.render('todo', {todos: data})
    });

//This line is commented it is taking data form static data object defined above.
  // res.render('todo', {todos: data});
});

app.post('/todo', urlencodedParser, function(req, res){

   //Get data from the view and pass it to the mongoose schema to store it.
     var newTodoItem = Todo(req.body).save(function(err, data){
       if(err) throw err;
       res.json(data);
     });

  //These two lines are commented because now mongoose is used to save the data instead a static data object  //array.
    //  data.push(req.body);
    //  req.json(data);
});

app.delete('/todo/:item', function(req, res){

  //Delete data from mongoose from view
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if(err) throw err;
      res.json(data);
    })

  //These lines are commneted beacuse the were using to remove element from static data object.
    // data = data.filter(function(todo){
    //   return todo.item.replace(/ /g, '-') !== req.params.item;
    //   });
    // res.json(data);
  })


  app.get('/signup', urlencodedParser, function(req, res){
    res.render('signup');
  })

  app.post('/signupped', urlencodedParser, function(req, res){
    console.log("the data of signup"+ req.body);
    var newSignup = Signup(req.body).save(function(err, data){
      if(err) throw err;
      res.json(data);
    });
  })
  
  };
