require('./config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos',authenticate, (req, res) => {
    console.log(req.body);
     var todo = new Todo({
         text: req.body.text,
         _creator: req.user._id
     }); 
     todo.save().then((doc) => {
         res.send(doc);
     }, (err) => {
         res.status(400).send(err);
      }); 
});

app.get('/todos',authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.status(200).send({todos});
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos/:id', authenticate, (req, res) => {
   var id = req.params.id;
   if(!ObjectID.isValid(id)){
       console.log("Id not valid");
       return res.status(404).send();
   }

   Todo.findOne({
       _id: id,
       _creator: req.user._id
   }).then((todo) => {
        if(!todo){
            // console.log("No todo with this id found");
            return res.status(404).send();
        }
        res.status(200).send({todo});
   }).catch((e) => {
    //    console.log('ERROR!');
       res.status(400).send();
   });
});

app.delete('/todos/:id', authenticate, (req,res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.status(200).send({todo});
    }).catch((err) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id', authenticate, (req,res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
        }, {$set: body}, { new: true}).then((todo) => {
            
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })
});

app.post('/users',(req,res) => {
    var body = _.pick(req.body, ['email','password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
        // res.send(user);
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
}); 

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email','password']);

    User.findByCredentials(body.email, body.password).then((user) =>{
        return user.generateAuthToken().then((token) => {
            res.header('x-auth',token).send(user); 
        });
    }).catch((e) => {
        res.status(400).send();
    });    
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});


app.listen(port, ()=> {
    console.log(`Started up at port ${port}`);
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