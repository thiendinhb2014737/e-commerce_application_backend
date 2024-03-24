const Router = require('express');
const {
    getEvent
} = require('../controllers/eventController');

const eventRouter = Router();
eventRouter.get('/get-event', getEvent)

module.exports = eventRouter;