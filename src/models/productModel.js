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

        colorBe: { type: String, require: true },
        colorWhite: { type: String, require: true },
        colorBlack: { type: String, require: true },
        colorBlue: { type: String, require: true },

        countColorBeS: { type: Number, require: true },
        countColorBeM: { type: Number, require: true },
        countColorBeL: { type: Number, require: true },
        countColorBeXL: { type: Number, require: true },

        countColorWhiteS: { type: Number, require: true },
        countColorWhiteM: { type: Number, require: true },
        countColorWhiteL: { type: Number, require: true },
        countColorWhiteXL: { type: Number, require: true },

        countColorBlackS: { type: Number, require: true },
        countColorBlackM: { type: Number, require: true },
        countColorBlackL: { type: Number, require: true },
        countColorBlackXL: { type: Number, require: true },

        countColorBlueS: { type: Number, require: true },
        countColorBlueM: { type: Number, require: true },
        countColorBlueL: { type: Number, require: true },
        countColorBlueXL: { type: Number, require: true },

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
