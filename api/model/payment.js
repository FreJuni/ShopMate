const { model, Schema } = require("mongoose");

const paymentSchema = new Schema([
    {
        payment_type: {
            type: String,
            required: true
        },
        account_name: {
            type: String,
            required: true,
        },
        account_number: {
            type: String,
            required: true,
        }
    }
], {
    timestamps: true,
});

module.exports = model("payment", paymentSchema);