const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const projectCategories = new Schema({
  title: { type: String, required: true },
  languages: {type: Object},
  childs: {type: Array},
  parents: {type: Array},
  products: {type: Array},
  isPublished: {type: Boolean, default: true},
  order: {type: Number}
});


module.exports = mongoose.model('ProjectCategories', projectCategories);
