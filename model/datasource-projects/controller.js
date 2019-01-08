const Controller = require('../../lib/controller');
const datasourceProjects = require('./facade');

class DatasourceProjects extends Controller {}

module.exports = new DatasourceProjects(datasourceProjects);
