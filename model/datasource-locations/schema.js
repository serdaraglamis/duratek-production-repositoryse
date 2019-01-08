const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const datasourceLocations = new Schema({
  languages: {type: Object},
  title: {type: String},
  isPublished: {type: Boolean, default: true},
  order: {type: Number}
});


module.exports = mongoose.model('DatasourceLocations', datasourceLocations);
