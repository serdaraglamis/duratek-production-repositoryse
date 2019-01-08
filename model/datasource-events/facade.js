const Facade = require('../../lib/facade');
const datasourceEvents = require('./schema');

class DatasourceEvents extends Facade {}

module.exports = new DatasourceEvents(datasourceEvents);
