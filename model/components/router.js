const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/')
  .get((...args) => controller.find(...args))
  .post((...args) => controller.create(...args));

/*   router.get('/', function (req, res) {
    res.send({deneme: 2})
  }) */

router.route('/:id')
  .put((...args) => controller.update(...args))
  .get((...args) => controller.findById(...args))
  .delete((...args) => controller.remove(...args));

  router.route('/find/query')
  .get((...args) => controller.find(...args));


module.exports = router;
