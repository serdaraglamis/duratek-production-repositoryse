const Facade = require('../../lib/facade');
const datasourceNews = require('./schema');

class DatasourceNews extends Facade {}

module.exports = new DatasourceNews(datasourceNews);
