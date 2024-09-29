

const { Schema, model } = require('mongoose');

const orderSchema = new Schema([
    {
        product_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'product',
        },
        user_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'user'
        },
        quantity: {
            type: String,
            required: true,
        },
        order_code: {
            type: String,
            required: true
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

module.exports = model('order', orderSchema);