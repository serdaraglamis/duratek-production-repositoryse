const Controller = require('../../lib/controller');
const projectCategories = require('./facade');

class ProjectCategories extends Controller {}

module.exports = new ProjectCategories(projectCategories);
