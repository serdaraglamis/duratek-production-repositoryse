const Facade = require('../../lib/facade');
const products = require('./schema');

class Products extends Facade {}

module.exports = new Products(products);
