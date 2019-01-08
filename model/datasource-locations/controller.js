const Controller = require('../../lib/controller');
const datasourceLocations = require('./facade');

class DatasourceLocations extends Controller {}

module.exports = new DatasourceLocations(datasourceLocations);
