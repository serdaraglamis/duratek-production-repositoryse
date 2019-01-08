const Controller = require('../../lib/controller');
const datasourceEvents = require('./facade');

class DatasourceEvents extends Controller {}

module.exports = new DatasourceEvents(datasourceEvents);
