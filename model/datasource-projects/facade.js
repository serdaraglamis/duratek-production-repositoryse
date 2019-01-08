const Facade = require('../../lib/facade');
const datasourceProjects = require('./schema');

class DatasourceProjects extends Facade {}

module.exports = new DatasourceProjects(datasourceProjects);
