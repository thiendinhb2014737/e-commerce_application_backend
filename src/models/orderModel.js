const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderItems: [
        {
            name: { type: String, require: true },
            amount: { type: Number, require: true },
            image: { type: String, require: true },
            price: { type: Number, require: true },
            discount: { type: Number },
            size: { type: String, require: true },
            color: { type: String, require: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                require: true,
            },
        },
    ],
    shippingAddress: {
        fullName: { type: String, require: true },
        address: { type: String, require: true },
        // city: { type: String, require: true },
        phone: { type: Number, require: true },

    },
    paymentMethod: { type: String, require: true },
    itemsPrice: { type: Number, require: true },
    shippingPrice: { type: Number, require: true },
    totalPrice: { type: Number, require: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    statusOder: { type: String, default: 'Chưa xác nhận' },
    deliveredAt: { type: Date },
    createOrderdAt: { type: String },
    maDH: { type: String }
},
    {
        timestamps: true // Thời gian tạo và update
    }
);
const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel;