import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: {
        firstName: { type: String, required: true },
        LastName: { type: String, required: true },
        email: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        Zipcode: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: String, required: true },
    },
    status: { type: String, default: "pending" },
    date: { type: Date, default: Date.now },
    payment: { type: Boolean, default: false }, // not required in request, default is fine
});

const OrderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default OrderModel;
