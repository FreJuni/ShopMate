const { model, Schema } = require("mongoose");

const categorySchema = new Schema([
    {
        category: {
            type: String,
            required: true,
        }
    }
],
    {
        timestamps: true
    }
);

module.exports = model('category', categorySchema);