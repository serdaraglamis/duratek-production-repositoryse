const Controller = require('../../lib/controller');
const productCategories = require('./facade');

class ProductCategories extends Controller {}

module.exports = new ProductCategories(productCategories);
