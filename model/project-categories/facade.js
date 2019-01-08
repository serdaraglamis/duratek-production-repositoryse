const Facade = require('../../lib/facade');
const projectCategories = require('./schema');

class ProjectCategories extends Facade {}

module.exports = new ProjectCategories(projectCategories);
