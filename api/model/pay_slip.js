const { Schema, model } = require('mongoose');

const paySchema = new Schema([
    {
        order_code: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        payment_type: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: 0,
        }
    }
],
    {
        timestamps: true,
    }
);

module.exports = model('pay', paySchema);