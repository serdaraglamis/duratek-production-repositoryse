const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productCategories = new Schema({
  title: { type: String, required: true },
  languages: {type: Object},
  childs: {type: Array},
  parents: {type: Array},
  products: {type: Array},
  order: {type: Number}
});


module.exports = mongoose.model('ProductCategories', productCategories);
