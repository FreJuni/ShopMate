const Payment = require('../../../model/payment');


exports.create = async (req, res) => {
    const { payment, accountName, accountNumber } = req.body;
    try {
        Payment.create({
            payment_type: payment,
            account_name: accountName,
            account_number: accountNumber,
        });

        return res.status(201).json({ success: true, message: "Payment Method Created Successfully" });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.payments = async (req, res) => {
    try {
        const paymentDoc = await Payment.find();

        return res.status(201).json({ success: true, paymentDoc });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.oldPayment = async (req, res) => {
    const { id } = req.params;
    try {
        const paymentDoc = await Payment.find({ _id: id });

        return res.status(201).json({ success: true, paymentDoc });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.update = async (req, res) => {
    const { payment, accountName, accountNumber, id } = req.body;

    try {
        const paymentDoc = await Payment.find({ _id: id });

        if (!paymentDoc) {
            throw new Error("Something went wrong");
        }

        paymentDoc[0].payment_type = payment;
        paymentDoc[0].account_name = accountName
        paymentDoc[0].account_number = accountNumber
        await paymentDoc[0].save()

        return res.status(201).json({ success: true, message: "Payment Method Updated Successfully" });

    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.delete = async (req, res) => {
    const { id } = req.params;

    try {
        await Payment.findByIdAndDelete({ _id: id });

        return res.status(201).json({ success: true, message: "Payment Method Deleted Successfully" });

    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}