const { Schema, model } = require('mongoose');

const favoriteSchema = new Schema([
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
        }
    }
],
    {
        timestamps: true,
    }
);

module.exports = model('favorite', favoriteSchema);