const { model, Schema } = require("mongoose");

const productSchema = new Schema([
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'category'
        },
        quantity: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        }
    }
], {
    timestamps: true,
});

module.exports = model("product", productSchema);