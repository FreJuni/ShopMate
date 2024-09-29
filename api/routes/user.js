const UserController = require('../controller/user/user');

const express = require('express');

const router = express.Router();

router.get('/all/products', UserController.getAllProducts);

router.get('/all/category', UserController.getAllCategory);

router.get('/category/:id', UserController.searchByCategory);

router.get('/search', UserController.search);

router.get('/search-by-category/:id', UserController.searchCategory);

router.get('/search-by-range', UserController.searchByRange);

router.get('/search-by-mini', UserController.searchByMini);

router.get('/search-by-max', UserController.searchByMax);

router.get('/single/product/:id', UserController.singleProduct);

router.post('/add/favorite', UserController.addToFavorite);

router.post('/get/favorites/:id', UserController.getAllFavorite);

router.get('/remove/favorite/:id', UserController.removeFavorite);

router.post('/rate/product', UserController.rateProduct);

router.get('/get/rate/:id', UserController.getRate);

router.post('/review/product', UserController.reviewProduct);

router.get('/get/reviews/:id', UserController.getReviews);

router.post('/add-to-cart', UserController.addToCart);

router.get('/get/cart/:id', UserController.getCarts);

router.get('/remove/cart/:id', UserController.removeCart);

router.get('/get/payment', UserController.getPaymentMethod);

router.post('/order/product', UserController.orderProduct);

router.get('/get/order/:id', UserController.getOrders);

router.get('/get/all/reviews', UserController.getAllReviews);

router.get('/get/best/sell', UserController.getBestSell);

router.post('/contact', UserController.contact);


module.exports = router;