const Controller = require('../../lib/controller');
const components = require('./facade');

class Components extends Controller {
    findByName(req, res, next) {
        console.log('REQ NAME GELDİ', req.params);
    }
}

module.exports = new Components(components);
