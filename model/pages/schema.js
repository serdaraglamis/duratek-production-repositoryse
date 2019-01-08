const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const pages = new Schema({
  name: { type: String, required: true },
  path: { type: String },
  languages: {type: Object, default: {tr: {name: null, path: null}, en: {name: null, path: null}} },
  components: {type: Array},
  isPublished: {type: Boolean, default: true},
  order: {type: Number}
});


module.exports = mongoose.model('Pages', pages);
