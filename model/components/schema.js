const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const components = new Schema({
  name: { type: String, required: true },
  isEditable: { type: Boolean, required: true },
  Schema: {type: Array},
  code: {type: String, required: true},
  isPublished: {type: Boolean, default: true},
  order: {type: Number}
});


module.exports = mongoose.model('Components', components);
