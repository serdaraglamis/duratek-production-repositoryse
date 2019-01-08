const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const languages = new Schema({
  options: { type: Array },
  rendered: { type: Object },
});


module.exports = mongoose.model('Languages', languages);
