var mongoose = require('mongoose');
var mongoDB = 'mongodb://abhisheksinghal:M+29ko+lab@ds141221.mlab.com:41221/todoapp';
mongoose.Promise = global.Promise;
var options =  {useNewUrlParser: true};
mongoose.connect(mongoDB, options);
// mongoose.connect('mongodb://localhost:27017/TodoApp', options);
// console.log("Process environment are : ");
// console.log(JSON.stringify(process.env, undefined, 2));

module.exports = {mongoose};