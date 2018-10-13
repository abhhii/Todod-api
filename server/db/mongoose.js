var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var options =  {useNewUrlParser: true};
mongoose.connect('mongodb://localhost:27017/TodoApp', options);

module.exports = {mongoose};