const Facade = require('../../lib/facade');
const components = require('./schema');

class Components extends Facade {}

module.exports = new Components(components);
