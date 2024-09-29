const Category = require('../../../model/category');
const Product = require('../../../model/product');
const { v2: cloudinary } = require('cloudinary');
require('dotenv').config();
const { extractPublicId } = require('cloudinary-build-url');

cloudinary.config({
    cloud_name: 'dyzhvekwq',
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

exports.category = async (req, res) => {
    try {
        const categoryDoc = await Category.find();

        return res.status(201).json({ success: true, categoryDoc });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.create = async (req, res) => {
    const { name, price, category, quantity, message } = req.body;
    const image = req.file;

    const productImage = image.path;

    try {
        cloudinary.uploader.upload(productImage,
            async (error, result) => {

                if (!error) {
                    const url = result.url;

                    await Product.create({
                        name: name,
                        price: price,
                        category: category,
                        quantity: quantity,
                        message: message,
                        image: url,
                    });

                    return res.status(201).json({ success: true, message: 'Product Created Successfully' })
                } else {
                    throw new Error(error);
                }
            });

    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}


exports.products = async (req, res) => {

    const limit = 7;
    const page = req.query.page || 1;

    try {
        const productCount = await Product.countDocuments();

        const productDoc = await Product.find().limit(limit).skip((page - 1) * limit);

        return res.status(201).json({ success: true, productDoc, productCount });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.details = async (req, res) => {
    const { id } = req.params;

    try {
        const productDoc = await Product.find({ _id: id }).populate('category', 'category');

        return res.status(201).json({ success: true, productDoc });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.oldProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const oldProduct = await Product.find({ _id: id }).populate('category', '_id');

        return res.status(201).json({ success: true, oldProduct });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.update = async (req, res) => {

    const { name, price, category, quantity, message, productId } = req.body;
    const image = req.file;

    try {
        const oldProduct = await Product.find({ _id: productId });

        if (oldProduct.length == 0) {
            throw new Error("Something went wrong");
        }

        if (image == undefined) {

            oldProduct[0].name = name,
                oldProduct[0].price = price,
                oldProduct[0].category = category,
                oldProduct[0].image = oldProduct[0].image,
                oldProduct[0].message = message,
                oldProduct[0].quantity = quantity,
                await oldProduct[0].save();

        } else {
            const productImage = image.path;
            const publicId = extractPublicId(oldProduct[0].image);

            cloudinary.uploader.destroy(publicId, async (error, result) => {

                if (!error) {
                    cloudinary.uploader.upload(productImage,
                        async (error, result) => {

                            if (!error) {
                                const url = result.url;

                                oldProduct[0].name = name,
                                    oldProduct[0].price = price,
                                    oldProduct[0].category = category,
                                    oldProduct[0].image = url,
                                    oldProduct[0].message = message,
                                    oldProduct[0].quantity = quantity,
                                    await oldProduct[0].save();
                            } else {
                                throw new Error(error);
                            }
                        });
                }

            })
        }

        return res.status(201).json({ success: true, message: 'Product Updated Successfully' })

    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.delete = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.find({ _id: id });
        const publicId = extractPublicId(product[0].image);

        cloudinary.uploader.destroy(publicId, async (error, result) => {

            if (!error) {
                await Product.findByIdAndDelete({ _id: id });

                return res.status(201).json({ success: true, message: "Product Deleted Successfully" });
            }
        });

    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.getTotalPrice = async (req, res) => {

    try {
        const productDoc = await Product.find();

        let total = productDoc.length > 0 && productDoc.reduce((total, item) => {
            total += Number(item.price);

            return total;
        }, 0);

        return res.status(201).json({ success: true, total });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

