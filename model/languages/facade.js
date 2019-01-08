const Facade = require('../../lib/facade');
const languages = require('./schema');

class Languages extends Facade {}

module.exports = new Languages(languages);
