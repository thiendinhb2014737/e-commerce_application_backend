const Router = require('express');
const {
    createContact
} = require('../controllers/contactController');

const contactRouter = Router();
contactRouter.post('/create-contact', createContact)

module.exports = contactRouter;