// const MongoClient = require('mongodb').MongoClient;
// const {MongoClient} = require('mongodb'); // this is same as upper line (object destructuring)

const {MongoClient, ObjectID} = require('mongodb');
// const ObjectID = require('mongodb').ObjectID;
// var obj = new ObjectID();
// console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, database) => {
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    const db = database.db('TodoApp');
    
    // db.collection('Todos').find({
    //     _id: new ObjectID('5bbbcee02e89a94440d09220')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log("Unable to fetch todos",err);
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count : ${count}`);
    // }, (err) => {
    //     console.log("Unable to fetch todos",err);
    // });

    db.collection('Users').find({name: 'Zombie'}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log("Unable to fetch data", err);
    });
    // database.close();
});

