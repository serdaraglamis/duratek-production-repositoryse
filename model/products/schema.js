const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const products = new Schema({
  title: { type: String, required: true },
  languages: {type: Object},
  categories: {type: Array},
  isPublished: {type: Boolean, default: true},
  order: {type: Number},
  productCode: {type: String}
});


module.exports = mongoose.model('Products', products);
