const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo');
var {User} = require('./../server/models/user');

var id = '5bc1bf69218ad36652256546';
var UserId = "5bbe08096f9fa1136f74e815";

if(!ObjectID.isValid(id) || !ObjectID.isValid(UserId)){
    console.log("Id not valid");
}

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     if(!todo){
//         return console.log('Id not found!');
//     }
//     console.log('Todo',todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('Id not found!');
//     }
//     console.log('Todo by Id ', todo);
// }).catch((err) => console.log(err));

User .findById(UserId).then((user) => {
    if(!user){
        return console.log('User not found!');
    }
    console.log(JSON.stringify(user, undefined, 2));
}, (err) => {
    console.log(err);
}).catch((err) => console.log(err));