const { Schema, model } = require('mongoose');

const cartSchema = new Schema([
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
        }
    }
],
    {
        timestamps: true,
    }
);

module.exports = model('cart', cartSchema);