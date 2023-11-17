// Array of products
const products = [
    { id: '1a', name: 'Hoodie' },
    { id: '1b', name: 'Sticker' },
    { id: '1c', name: 'Socks' },
    { id: '1d', name: 'T-Shirt' },
    { id: '1e', name: 'Beanie' }
  ];
  
  const get = (req, res, next) => {
    try {
      res.status(200).send(products);
    } catch (e) {
      next();
    }
  };
  
  const getById = (req, res, next) => {
    const productId = req.params.id;
  
    try {
      const product = products.filter(product => product.id === productId)[0]
  
      if(product){
        res.status(200).send(product);
      }else{
        res.status(404).send('No product matching the given id was found');
      }
      
    } catch (e) {
      next();
    }
  };
  
  const ProductsController = {
    get,
    getById
  };
  
  module.exports = ProductsController;
  