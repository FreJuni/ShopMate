const Order = require('../../../model/order');
const Pay = require('../../../model/pay_slip');

exports.getAllUserOrders = async (req, res) => {

    const limit = 6;
    const page = req.query.page || 1;

    try {

        const orderCount = await Pay.countDocuments();

        const payDoc = await Pay.find().limit(limit).skip((page - 1) * limit);

        if (payDoc.length == 0) {
            throw new Error("Something went wrong");
        }

        return res.status(201).json({ success: true, payDoc, orderCount });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.getAllUserOrder = async (req, res) => {

    try {

        const orderDoc = await Order.find().populate('product_id', 'price');

        if (orderDoc.length == 0) {
            throw new Error("Something went wrong");
        }

        return res.status(201).json({ success: true, orderDoc });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.changeStatus = async (req, res) => {

    const { status, id, orderCode } = req.body;
    try {

        const payDoc = await Pay.find({ _id: id });

        payDoc[0].status = status,
            await payDoc[0].save();

        const orderDoc = await Order.find({ order_code: orderCode });

        orderDoc.map(async (item) => {
            item.status = status
            await item.save();
        });


        return res.status(201).json({ success: true });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.getOrderByOrderCode = async (req, res) => {
    const { id } = req.params;
    try {
        const orderDoc = await Order.find({ order_code: id }).populate('product_id', 'name image price');


        if (orderDoc.length == 0) {
            throw new Error("Something went wrong");
        }

        return res.status(201).json({ success: true, orderDoc });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.getPayInfo = async (req, res) => {
    const { id } = req.params;
    try {
        const payDoc = await Pay.find({ order_code: id })

        if (payDoc.length == 0) {
            throw new Error("Something went wrong");
        }

        return res.status(201).json({ success: true, payDoc });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.getSaleProduct = async (req, res) => {

    const limit = 6;
    const page = req.query.page || 1;

    try {

        const saleCount = await Order.find({ status: 1 }).populate('product_id', 'name image price').countDocuments();

        const saleDoc = await Order.find({ status: 1 }).populate('product_id', 'name image price').limit(limit).skip((page - 1) * limit);


        if (saleDoc.length == 0) {
            throw new Error("Something went wrong");
        }

        return res.status(201).json({ success: true, saleDoc, saleCount });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.getPendingProduct = async (req, res) => {

    try {
        const pendingDoc = await Pay.find({ status: 0 });

        return res.status(201).json({ success: true, pendingDoc });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}