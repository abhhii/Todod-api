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

    //deleteMany
    // db.collection('Todos').deleteMany({text: 'Something to do'}).then((result) => {
    //     console.log(result);
    // });

    //deleteOne finds matching entry and deletes first match

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });
    db.collection('Users').findOneAndDelete({_id: new ObjectID('5bbcff32291ff2700559b93e')
    }).then((result) =>{
        console.log(result);
    })
    
    // database.close();
});

