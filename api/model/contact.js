const { Schema, model } = require('mongoose');

const contactSchema = new Schema([
    {
        name: {
            type: String,
            required: true,
            ref: 'product',
        },
        email: {
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

module.exports = model('contact', contactSchema);