const database = {
  mongo: {
    url: process.env.MONGO_DB_URI || 'mongodb://duratek:duratek@cluster0-shard-00-00-xex2s.gcp.mongodb.net:27017,cluster0-shard-00-01-xex2s.gcp.mongodb.net:27017,cluster0-shard-00-02-xex2s.gcp.mongodb.net:27017/duratek?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
  }
};

module.exports = database;
