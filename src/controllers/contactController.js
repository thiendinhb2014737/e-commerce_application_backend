const Contact = require("../models/ContactModel")

const createContact = (req, res) => {
    const { name, email, phone, content } = req.body
    return new Promise(async (resolve, reject) => {
        try {
            const createdContact = await Contact.create({
                name,
                email,
                phone,
                content
            })
            if (createdContact) {
                res.status(200).json({
                    status: 'OK',
                    message: 'SUCCESS!',
                    data: createdContact
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createContact,
}