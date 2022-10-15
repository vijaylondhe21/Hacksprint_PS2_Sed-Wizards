const {MongoClient, MongoNetworkError} = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function dbconnection(){
    let result = await client.connect();
    let dbx = result.db('lib_hackn');
    return dbx.collection('Books');
        
}

module.exports = dbconnection;