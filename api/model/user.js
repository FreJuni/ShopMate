const { Schema, model } = require('mongoose');

const userSchema = new Schema([
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        address: {
            type: String,
        },
        phone: {
            type: String,
        },
        image: {
            type: String,
            default: null,
        },
        role: {
            type: String,
            default: 'user'
        },
        status: {
            type: String,
            default: 0
        }
    }
], {
    timestamps: true
}
);

module.exports = model('user', userSchema);