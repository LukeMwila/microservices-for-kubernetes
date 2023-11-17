const OrdersController = require('../controllers/orders_controller');

const routes = app => {
  // @route    GET api
  // @desc     Get orders
  // @access   Public
  app.get('/v1/orders', OrdersController.get);
  // @route    GET api
  // @desc     Get orders and their products
  // @access   Public
  app.get('/v1/orders/products', OrdersController.getOrdersWithProducts);
};

module.exports = routes;
