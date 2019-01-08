const Controller = require('../../lib/controller');
const languages = require('./facade');

class Languages extends Controller {
    findPage(req, res, next) {
        console.log(req.body);
        this.findSpecial(req, res, next, req.body)
    }


}

module.exports = new Languages(languages);
