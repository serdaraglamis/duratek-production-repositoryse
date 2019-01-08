const Controller = require('../../lib/controller');
const datasourceMenu = require('./facade');

class DatasourceMenu extends Controller {}

module.exports = new DatasourceMenu(datasourceMenu);
