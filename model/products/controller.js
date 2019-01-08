const Controller = require('../../lib/controller');
const products = require('./facade');

class Products extends Controller {}

module.exports = new Products(products);
