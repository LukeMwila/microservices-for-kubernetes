const axios = require('axios');

// Array of orders
const orders = [
  { id: '1', productId: '1a', orderFor: 'Herbert Kelvin Jr.', deliveryAddress: 'Asphalt Street', deliveryDate: '02/11/2023', deliveryType: 'STANDARD' },
  { id: '2', productId: '1b', orderFor: 'John Zulu Nunez', deliveryAddress: 'Beta Road', deliveryDate: '10/10/2023', deliveryType: 'FAST DELIVERY' },
  { id: '3', productId: '1c', orderFor: 'Lael Fanklin', deliveryAddress: 'Charlie Avenue', deliveryDate: '02/10/2023', deliveryType: 'STANDARD' },
  { id: '4', productId: '1d', orderFor: 'Candice Chipilli', deliveryAddress: 'Delta Downing View', deliveryDate: '22/09/2023', deliveryType: 'FAST DELIVERY' },
  { id: '5', productId: '1d', orderFor: 'Tedashii Tembo', deliveryAddress: 'Echo Complex', deliveryDate: '12/12/2023', deliveryType: 'FAST DELIVERY' }
];

const get = (req, res, next) => {
  try {
    res.status(200).send(orders);
  } catch (e) {
    next();
  }
};

const getOrdersWithProducts = async (req, res, next) => {
  try {
      async function getProductsForOrders() {
        try {
          const ordersList = await Promise.all(orders.map(async order => {

            const productForOrder = await axios.get(`${process.env.PRODUCTS_SERVICE_PORT}/v1/products/${order.productId}`);
            const product = productForOrder.data
            return {...order, product}
          }))
          return ordersList
        }catch (error) {
          console.error(error);
        }
      }
      // Loop through orders and query product endpoint to fetch the product for that order
      const ordersWithProducts = await getProductsForOrders()
      console.log(ordersWithProducts)
      // Return list of orders with their associated products
      if(ordersWithProducts){
        res.status(200).send(ordersWithProducts);
      }else {
        res.status(503).send('There was an internal server error');
      }
  } catch (e) {
    next();
  }
};

const OrdersController = {
  get,
  getOrdersWithProducts
};

module.exports = OrdersController;
