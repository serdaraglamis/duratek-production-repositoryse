const Controller = require('../../lib/controller');
const datasourceNews = require('./facade');

class DatasourceNews extends Controller {}

module.exports = new DatasourceNews(datasourceNews);
