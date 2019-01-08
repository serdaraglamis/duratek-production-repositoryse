const Facade = require('../../lib/facade');
const datasourceMenu = require('./schema');

class DatasourceMenu extends Facade {}

module.exports = new DatasourceMenu(datasourceMenu);
