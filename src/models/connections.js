const { MongoClient } = require('mongodb');
// GIT
// const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
// const DB_NAME = 'Cookmaster';
// PC
const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

const connection = () => MongoClient
.connect(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then((conn) => conn.db(DB_NAME))
.catch((err) => {
  console.error(err);
  process.exit(1);
});

module.exports = connection;