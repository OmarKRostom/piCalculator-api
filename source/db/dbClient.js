const MongoClient = require('mongodb').MongoClient
const dotenv = require('dotenv')
dotenv.config()

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}`
const dbClient = new MongoClient(uri, {
     useNewUrlParser: true
})
dbClient.connect(err => {
    console.log("Here goes the DB error log: ", err)
})

module.exports = dbClient
