const Facade = require('../../lib/facade');
const datasourceLocations = require('./schema');

class DatasourceLocations extends Facade {}

module.exports = new DatasourceLocations(datasourceLocations);
