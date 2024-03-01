const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(

    {
        name: { type: String, require: true, unique: true },
        image: { type: String, require: true },
        type: { type: String, require: true },
        price: { type: Number, require: true },
        sizeS: { type: String, require: true },
        sizeM: { type: String, require: true },
        sizeL: { type: String, require: true },
        sizeXL: { type: String, require: true },
        countS: { type: Number, require: true },
        countM: { type: Number, require: true },
        countL: { type: Number, require: true },
        countXL: { type: Number, require: true },
        countInStock: { type: Number, require: true },
        rating: { type: Number, require: true },
        description: { type: String },
        discount: { type: Number },
        selled: { type: Number }

    },
    {
        timestamps: true // Thời gian tạo và update
    }
);
const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
