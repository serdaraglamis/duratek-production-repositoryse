const Facade = require('../../lib/facade');
const pages = require('./schema');

class Pages extends Facade {}

module.exports = new Pages(pages);
