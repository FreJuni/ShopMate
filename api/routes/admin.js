const express = require("express");
const { route } = require("./auth");
const CategoryController = require('../controller/admin/category/category');
const PaymentController = require('../controller/admin/payment/payment');
const ProductController = require('../controller/admin/product/product');
const ListController = require('../controller/admin/list/list');
const PasswordController = require('../controller/admin/password/password');
const ProfileController = require('../controller/admin/profile/profile');
const OrderController = require('../controller/admin/order/order');
const ContactController = require('../controller/admin/contact/contact');

// middleware
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// category route
router.post('/add/category', authMiddleware, CategoryController.addCategory);

router.get('/category', CategoryController.category);

router.get('/edit/category/:id', CategoryController.edit);

router.post('/update/category', CategoryController.update);

router.get('/delete/category/:id', CategoryController.delete);

// payment route
router.post('/create/payment', PaymentController.create);

router.get('/get/payments', PaymentController.payments);

router.get('/get/old/payment/:id', PaymentController.oldPayment);

router.post('/update/payment', PaymentController.update);

router.get('/delete/payment/:id', PaymentController.delete);

// product route
router.post('/create/product', ProductController.create);

router.get('/get/category', ProductController.category);

router.get('/get/products', ProductController.products);

router.get('/product/details/:id', ProductController.details);

router.get('/old/product/:id', ProductController.oldProduct);

router.post('/update/product', ProductController.update);

router.get('/delete/product/:id', ProductController.delete);

router.get('/get/total/price', ProductController.getTotalPrice);

router.get('/get/sale/product', OrderController.getSaleProduct);

// list
router.get('/admin-list', ListController.admin);

router.get('/user-list', ListController.user);

router.get('/change-to-user/:id', ListController.changeToUser);

router.get('/change-to-admin/:id', ListController.changeToAdmin);

router.get('/delete/user/:id', ListController.deleteUser);

router.get('/get/users', ListController.getUsers);

// password change
router.post('/change/password', PasswordController.changePassword);

// profile

router.get('/user/info/:id', ProfileController.getUserInfo);

router.post('/update/profile/', ProfileController.updateProfile);

// add new admin
router.post('/new/admin', ProfileController.addNewAdmin);

// order
router.get('/get/all/orders', OrderController.getAllUserOrders);

router.get('/get/all/order', OrderController.getAllUserOrder);

router.post('/change/status', OrderController.changeStatus);

router.get('/get/order/:id', OrderController.getOrderByOrderCode);

router.get('/get/pay/info/:id', OrderController.getPayInfo);

router.get('/get/pending/product', OrderController.getPendingProduct);

// contact
router.get('/get/contact', ContactController.contacts);

module.exports = router;