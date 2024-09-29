const { Schema, model } = require('mongoose');

const reviewSchema = new Schema([
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

module.exports = model('review', reviewSchema);