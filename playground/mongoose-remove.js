const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo');
var {User} = require('./../server/models/user');

// Todo.deleteMany({}).then((result) => {
//     console.log(result);
// });

//Todo.findOneAndRemove()
// findByIdAndRemove

Todo.findByIdAndRemove('5bc25b9939cee238953e65ef').then((todo) => {
    console.log(todo);
});