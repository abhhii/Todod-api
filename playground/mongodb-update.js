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

    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5bbbd1ea27a4d544f408269d')
    },{
        $set: {
            completed: true
        }
    },{
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5bbbd25b8120a5451201c3b8')
    },{
        $set: {
            name: 'Stryker' 
        },
        $inc: {
            age: 1
        }
    },{
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });
    // database.close();
});

