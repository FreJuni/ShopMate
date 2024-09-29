const Product = require('../../model/product');
const Category = require('../../model/category');
const Favorite = require('../../model/favourite');
const Rate = require('../../model/rate');
const Review = require('../../model/review');
const Cart = require('../../model/cart');
const Payment = require('../../model/payment');
const Order = require('../../model/order');
const Pay = require('../../model/pay_slip');
const Contact = require('../../model/contact');
const { v2: cloudinary } = require('cloudinary');

exports.getAllProducts = async (req, res) => {

    const limit = 8;
    const page = req.query.page || 1;

    try {

        const count = await Product.countDocuments();

        const productsDoc = await Product.find().limit(limit).skip((page - 1) * limit);

        return res.status(201).json({ success: true, count, productsDoc });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.getAllCategory = async (req, res) => {
    try {
        const categoryDoc = await Category.find();

        return res.status(201).json({ success: true, categoryDoc });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.searchByCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const productsDoc = await Product.find({ category: id });

        return res.status(201).json({ success: true, productsDoc });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.search = async (req, res) => {

    const { searchKey } = req.query;

    try {
        const productsDoc = await Product.find({
            $or: [
                { name: { $regex: searchKey, $options: 'i' } },
                { message: { $regex: searchKey, $options: 'i' } }
            ]
        });

        return res.status(201).json({ success: true, productsDoc });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.searchCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const productsDoc = await Product.find({ category: id });

        return res.status(201).json({ success: true, productsDoc });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.searchByRange = async (req, res) => {

    const { searchKey } = req.query;
    const range = Number(searchKey);

    if (isNaN(range) || range <= 0) {
        return res.status(400).json({ success: false, message: 'Invalid searchKey. Please provide a valid number greater than zero.' });
    }

    try {
        const productsDoc = await Product.aggregate([
            {
                $addFields: {
                    priceAsNumber: { $toDouble: "$price" }
                }
            },
            {
                $match: {
                    priceAsNumber: { $lt: range }
                }
            }
        ]);

        if (!productsDoc || productsDoc.length === 0) {
            return res.status(404).json({ success: false, message: 'No products found above the given price.' });
        }

        return res.status(200).json({ success: true, productsDoc });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
}

exports.searchByMini = async (req, res) => {
    const { searchKey } = req.query;
    const minPrice = Number(searchKey);

    if (isNaN(minPrice) || minPrice <= 0) {
        return res.status(400).json({ success: false, message: 'Invalid searchKey. Please provide a valid number greater than zero.' });
    }

    try {
        const productsDoc = await Product.aggregate([
            {
                $addFields: {
                    priceAsNumber: { $toDouble: "$price" }
                }
            },
            {
                $match: {
                    priceAsNumber: { $gt: minPrice }
                }
            }
        ]);

        if (!productsDoc || productsDoc.length === 0) {
            return res.status(404).json({ success: false, message: 'No products found above the given price.' });
        }

        return res.status(200).json({ success: true, productsDoc });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
}

exports.searchByMax = async (req, res) => {
    const { searchKey } = req.query;
    const maxPrice = Number(searchKey);

    if (isNaN(maxPrice) || maxPrice <= 0) {
        return res.status(400).json({ success: false, message: 'Invalid searchKey. Please provide a valid number greater than zero.' });
    }

    try {
        const productsDoc = await Product.aggregate([
            {
                $addFields: {
                    priceAsNumber: { $toDouble: "$price" }
                }
            },
            {
                $match: {
                    priceAsNumber: { $lt: maxPrice }
                }
            }
        ]);

        if (!productsDoc || productsDoc.length === 0) {
            return res.status(404).json({ success: false, message: 'No products found above the given price.' });
        }

        return res.status(200).json({ success: true, productsDoc });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
}

exports.singleProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const productDoc = await Product.find({ _id: id }).populate('category', 'category');

        return res.status(201).json({ success: true, productDoc });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.addToFavorite = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const favoriteDoc = await Favorite.find({ product_id: productId, user_id: userId });

        if (favoriteDoc.length > 0) {
            throw new Error("You have already added to favorite.")
        }

        await Favorite.create({
            user_id: userId,
            product_id: productId
        })

        return res.status(201).json({ success: true, message: "Add To Favorite Successfully" });

    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.getAllFavorite = async (req, res) => {
    const { id } = req.params;

    try {
        const favoriteDoc = await Favorite.find({ user_id: id }).populate('product_id');

        return res.status(201).json({ success: true, favoriteDoc });

    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}


exports.removeFavorite = async (req, res) => {
    const { id } = req.params;

    try {
        await Favorite.findByIdAndDelete({ _id: id });

        return res.status(201).json({ success: true, message: "Remove From Favorite Successfully" });

    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.rateProduct = async (req, res) => {
    const { userId, productId, rate, message } = req.body;

    try {

        let rateDoc = await Rate.find({ user_id: userId, product_id: productId });

        if (rateDoc.length > 0) {
            rateDoc[0].user_id = userId
            rateDoc[0].product_id = productId
            rateDoc[0].rate = rate
            rateDoc[0].message = message
            await rateDoc[0].save();
        } else {
            await Rate.create({
                product_id: productId,
                user_id: userId,
                rate: rate,
                message: message,
            })
        }

        return res.status(201).json({ success: true, message: "Rate Product Successfully" });

    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.getRate = async (req, res) => {
    const { id } = req.params;

    try {

        const rateDoc = await Rate.find({ product_id: id });

        const rateCount = rateDoc.length;

        let total = 0;

        rateDoc.map((item) => {
            total += Number(item.rate);
        });

        const averageRate = total / rateCount;

        return res.status(201).json({ success: true, rateDoc, averageRate, message: "Rate Product Successfully" });

    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.reviewProduct = async (req, res) => {
    const { userId, productId, message } = req.body;

    try {

        await Review.create({
            product_id: productId,
            user_id: userId,
            message: message,
        })

        return res.status(201).json({ success: true, message: "Add Product Review Successfully" });

    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.getReviews = async (req, res) => {
    const { id } = req.params;

    try {

        const reviewDoc = await Review.find({ product_id: id }).populate('user_id', 'name image');

        if (reviewDoc.length == 0) {
            throw new Error("Something went wrong")
        }

        return res.status(201).json({ success: true, reviewDoc });

    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.addToCart = async (req, res) => {

    const { productId, userId, quantity } = req.body;

    try {

        await Cart.create({
            product_id: productId,
            user_id: userId,
            quantity: quantity,
        })

        return res.status(201).json({ success: true, message: "Add To Cart Successfully" });

    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.getCarts = async (req, res) => {
    const { id } = req.params;

    try {

        const cartDoc = await Cart.find({ user_id: id }).populate('product_id', 'name price image');

        return res.status(201).json({ success: true, cartDoc });

    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}


exports.removeCart = async (req, res) => {
    const { id } = req.params;

    try {
        await Cart.findByIdAndDelete({ _id: id });

        return res.status(201).json({ success: true, message: "Remove From Cart Successfully" });

    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.getPaymentMethod = async (req, res) => {

    try {
        const paymentDoc = await Payment.find();

        return res.status(201).json({ success: true, paymentDoc });

    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.orderProduct = async (req, res) => {
    const { name, phone, orderCode, products, payment } = req.body;

    // Array to store products
    const product = JSON.parse(products);
    const image = req.file;
    const productImage = image.path;

    try {
        cloudinary.uploader.upload(productImage,
            async (error, result) => {

                if (!error) {
                    const url = result.url;

                    for (let index = 0; index < product.length; index++) {
                        await Order.create({
                            user_id: product[index].userId,
                            product_id: product[index].productId,
                            quantity: product[index].quantity,
                            status: 0,
                            order_code: orderCode
                        })
                    }

                    await Pay.create({
                        name: name,
                        phone: phone,
                        image: url,
                        payment_type: payment,
                        order_code: orderCode
                    });

                    for (let index = 0; index < product.length; index++) {
                        await Cart.findOneAndDelete({ user_id: product[index].userId });
                    }

                } else {
                    throw new Error(error);
                }
            });
        return res.status(201).json({ success: true, message: "Order Product Successfully" });

    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.getOrders = async (req, res) => {
    const { id } = req.params;

    try {
        const orderDoc = await Order.find({ user_id: id }).populate('product_id', 'name price image');

        return res.status(201).json({ success: true, orderDoc });

    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.getAllReviews = async (req, res) => {

    try {
        const reviewDoc = await Rate.find().populate('user_id', 'name image');

        return res.status(201).json({ success: true, reviewDoc });

    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.getBestSell = async (req, res) => {

    try {
        const sellDoc = await Order.find({ status: '1' }).populate('product_id', 'name image price')

        return res.status(201).json({ success: true, sellDoc });

    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.contact = async (req, res) => {
    const { name, email, message } = req.body;

    try {

        await Contact.create({
            name: name,
            email: email,
            message: message,
        })

        return res.status(201).json({ success: true, message: "Contact Message Send Successfully" });

    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}
