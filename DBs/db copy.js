const { MongoClient } = require('mongodb')
const URL = 'mongodb://localhost:27017/moviebox';
let dbConnection;
module.exports = {
 connectToDb: (cb) => {
  MongoClient
   .connect(URL)
   .then((client) => {
    console.log('Connect to mongodb');
    dbConnection = client.db();
    return cb()
   })
   .catch((err) => {
    return cb(err);
  })
 },
getDb: ()=> dbConnection, 
}
