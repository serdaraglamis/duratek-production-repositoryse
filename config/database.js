const database = {
  mongo: {
    url: process.env.MONGO_DB_URI || 'mongodb://serdar:serdar@ds119018.mlab.com:19018/anamorfoz-api'
  }
};

module.exports = database;
