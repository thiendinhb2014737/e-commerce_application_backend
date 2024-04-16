const mongoose = require('mongoose')
const contactSchema = new mongoose.Schema(

    {
        name: { type: String, require: true },
        email: { type: String, require: true },
        phone: { type: Number, require: true },
        content: { type: String, require: true },
    },
    {
        timestamps: true // Thời gian tạo và update
    }
);
const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;