const Controller = require('../../lib/controller');
const pages = require('./facade');

class Pages extends Controller {
    findPage(req, res, next) {
        console.log(req.body);
        this.findSpecial(req, res, next, req.body)
    }


}

module.exports = new Pages(pages);
