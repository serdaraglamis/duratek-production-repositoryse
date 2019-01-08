const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const datasourceMenu = new Schema({
  languages: { type: Object},
  isPublished: {type: Boolean, default: true},
  order: {type: Number}
});


module.exports = mongoose.model('DatasourceMenu', datasourceMenu);
