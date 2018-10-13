// const MongoClient = require('mongodb').MongoClient;
// const {MongoClient} = require('mongodb'); // this is same as upper line (object destructuring)

const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, database) => {
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    const db = database.db('TodoApp');
    console.log('Connected to MongoDB server');
    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, (err, result) => {
        if(err){
            return console.log('Unable to insert todo', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });
    db.collection('Users').insertOne({
        name: 'Abhishek Singhal',
        age: 19,
        location: 'Tamil Nadu'
    }, (err, result) => {
        if(err){
            return console.log("Unable to insert Todo");
        }
        console.log(result.ops[0]._id.getTimestamp());
    });
    database.close();
});

