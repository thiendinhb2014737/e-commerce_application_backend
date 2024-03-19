const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(

    {
        name: { type: String },
        email: { type: String, require: true, unique: true },
        password: { type: String, require: true },
        isAdmin: { type: Boolean, default: false, require: true },
        phone: { type: Number },
        address: { type: String },
        avatar: { type: String },
        createUserdAt: { type: String }
    },
    {
        timestamps: true // Thời gian tạo và update
    }
);
const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;