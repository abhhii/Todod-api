var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    console.log(req.body);
     var todo = new Todo({
         text: req.body.text
     }); 
     todo.save().then((doc) => {
         res.send(doc);
     }, (err) => {
         res.status(400).send(err);
      }); 
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.status(200).send({todos});
    }, (err) => {
        res.status(400).send(err);
    });
});

app.listen(3000, ()=> {
    console.log('Started on port 3000');
});

module.exports = {app};


// var newTodo = new Todo({
//     text: 'Cook Dinner'
// });

// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// },(err) => {
//     console.log('Unable to save todo');
// });

// newTodo = new Todo({
//     text: 'Party whole night',
//     completed: true,
//     completedAt: 12245
// });

// newTodo.save().then((doc) => {
//     console.log('Saved todo',doc);
// }, (err) => {
//     console.log('Unable to save todo');
// });
// var newUser = new User({
//     email: '       example@example.com       '
// });

// newUser.save().then((doc) => {
//     console.log('Saved user',doc);
// }, (err) => {
//     console.log('Error creating user',err );
// });