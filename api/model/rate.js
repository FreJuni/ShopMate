const { Schema, model } = require('mongoose');

const rateSchema = new Schema([
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
        rate: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        }
    }
],
    {
        timestamps: true,
    }
);

module.exports = model('rate', rateSchema);