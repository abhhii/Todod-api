const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 4
};

var token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token, '123abc');
console.log('decoded', decoded);

// var message = 'I am the master of the universe';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash : ${hash}`);

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// token.data.id = 5;
// token.data.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data)+ 'somesecret').toString();
// if(resultHash === token.hash){
//     console.log('Data not changed!');
// }else{
//     console.log('Date changed. Do not trust!');
// }