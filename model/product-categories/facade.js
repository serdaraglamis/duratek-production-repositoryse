const Facade = require('../../lib/facade');
const productCategories = require('./schema');

class ProductCategories extends Facade {}

module.exports = new ProductCategories(productCategories);
